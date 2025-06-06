from rest_framework import generics
from rest_framework.response import Response
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods
from django.db.utils import IntegrityError
from ..models import Band, Festival, BandEntry, Vote
from ..serializers import BandSerializer
from ..spotify_api.band import get_bands_details, get_band_by_name
from ..spotify_api.user import get_current_user
from ..utils import parse_request_body

class BandListCreate(generics.ListCreateAPIView):
    queryset = Band.objects.all()
    serializer_class = BandSerializer

    def get(self, request: HttpRequest):
        response = Response()
        response.data = get_bands_details([band.spotify_id for band in Band.objects.all()], access_token=request.COOKIES['access_token'])
        return response
    
class BandDetails(generics.RetrieveDestroyAPIView):
    queryset = Band.objects.all()
    serializer_class = BandSerializer
    lookup_field = 'spotify_id'

@require_http_methods(["POST"])
def add_list(request: HttpRequest):
    body = parse_request_body(request)
    band_names = body.get('band_names')
    festival_id = body.get('festival_id')
    

    if band_names == None or len(band_names) == 0:
        return JsonResponse({ 'error': 'no band names provided', 'message': 'no "band_names" key provided or an empty array' }, status=400)

    festival = None
    if festival_id != None:
        try:
            festival = Festival.objects.get(id=festival_id)
        except Festival.DoesNotExist:
            return JsonResponse({ 'error': 'bad festival_id', 'message': 'there is no festival with id "{}"'.format(festival_id) }, status=400)
    

    failed = []
    if len(band_names) == 1:
        bandname = band_names[0]
        id = get_band_by_name(bandname, request.COOKIES['access_token'], 5)
        if type(id) == str:
            try:
                new_band = Band(spotify_id=id)
                new_band.save()
                if festival != None:
                    new_bandentry = BandEntry(festival=festival, band=new_band)
                    new_bandentry.save()
                print('"{}" added succesfully'.format(bandname))
                message = 'created the band succesfully' if festival == None else 'created the band succesfully and added it to festival with id "{}"'.format(festival_id)
                return JsonResponse({ 'message': message }, status=201)
            except IntegrityError:
                print('"{}" already exists'.format(bandname))
                return JsonResponse({ 'message': 'band {} already exists'.format(bandname) }, status=200)
            except:
                print('got the id, but could not add "{}" to database'.format(bandname))
                return JsonResponse({ 'error': 'failed to add band "{}"'.format(bandname) }, status=500)
        else:
            return JsonResponse({ 'error': 'failed to automatically add band "{}"'.format(bandname), 'message': 'see suggestions band ycould you mean and add it amnually', 'suggestions': id }, status=207)
    else:
        for bandname in band_names:
            id = get_band_by_name(bandname, request.COOKIES['access_token'])
            if id == None:
                print('failed to add "{}"'.format(bandname))
                failed.append(bandname)
            else:
                try:
                    new_band = Band(spotify_id=id)
                    new_band.save()
                    if festival != None:
                        new_bandentry = BandEntry(festival=festival, band=new_band)
                        new_bandentry.save()
                    print('"{}" added succesfully'.format(bandname))
                except IntegrityError:
                    print('"{}" already exists'.format(bandname))
                    pass
                except:
                    print('got the id, but could not add "{}" to database'.format(bandname))
                    failed.append(bandname)

        
        if len(failed) == 0:
            message = 'created all bands succesfully' if festival == None else 'created all bands succesfully and added them to festival with id "{}"'.format(festival_id)
            return JsonResponse({ 'message': message }, status=201)
        else:
            return JsonResponse({ 'message': 'some bands weren\'t created', 'not_created_band_names': failed }, status=207)

@require_http_methods(["DELETE", "POST"])
def vote(request: HttpRequest, spotify_id):
    if request.method == 'POST':
        user_id = get_current_user(request.COOKIES['access_token'])['spotify_id']
        vote = parse_request_body(request).get('vote')
        if vote == None:
            return JsonResponse({'error': 'no vote provided', 'details': '"vote" should be one of these: {}'.format(get_possible_votes())}, status=400)
        elif vote not in Vote.VOTE_OPTIONS.keys():
            return JsonResponse({'error': 'unrecognized vote', 'details': '"user_status" should be one of these: {}'.format(get_possible_votes())}, status=400)
        
        entry = Vote(band_id=spotify_id, user_id=user_id, vote=vote)
        try:
            entry.save()
            return JsonResponse({ 
                    'message': 'successfully voted on a band', 
                    'details': { 
                        'user_id': user_id, 
                        'user_status': entry.get_vote_display(),
                        'band_id': spotify_id,
                }}, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'invalid band_id', 'details': 'no band with id "{}" found'.format(spotify_id)}, status=404)
        except Exception:
            return JsonResponse({'error': 'something went wrong', 'details': 'unhandled error occured'}, status=500)
    else:
        user_id = get_current_user(request.COOKIES['access_token'])['spotify_id']
        try:
            Vote.objects.get(band_id=spotify_id, user_id=user_id).delete()
            return JsonResponse({ 
                        'message': 'successfully deleted user entry', 
                        'details': { 
                            'user_id': user_id, 
                            'band_id': spotify_id,
                    }}, status=204)
        except Vote.DoesNotExist:
            return JsonResponse({ 'error': 'no user entry found', 'details': 'no user entry with user_id: "{}" and band_id: "{}" could be found'.format(user_id, spotify_id)}, status=404)
        except Exception:
            return JsonResponse({ 'error': 'something went wrong', 'details': 'unhandled error occured'}, status=500)
        
def get_possible_votes():
    out = ''
    for k, v in Vote.VOTE_OPTIONS.items():
        out += '"{}" for "{}",'.format(k, v)
    return out[:-1]