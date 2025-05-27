from rest_framework import generics
from django.http import HttpRequest, JsonResponse
from django.db.utils import IntegrityError
from django.views.decorators.http import require_http_methods
from ..models import Festival, UserEntry, BandEntry
from ..serializers import FestivalSerializer
from ..spotify_api.user import get_current_user_details
from ..utils import parse_request_body


class FestivalListCreate(generics.ListCreateAPIView):
    queryset = Festival.objects.all()
    serializer_class = FestivalSerializer
    

class FestivalDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Festival.objects.all()
    serializer_class = FestivalSerializer
    lookup_url_kwarg = 'festival_id'


@require_http_methods(["DELETE", "POST"])
def create_user_entry(request: HttpRequest, festival_id):
    if request.method == 'POST':
        user_id = get_current_user_details(request.COOKIES['access_token'])['id']
        user_status = parse_request_body(request).get('user_status')
        if user_status == None:
            return JsonResponse({'error': 'no status provided', 'details': '"user_status" should be one of these: {}'.format(get_possible_statuses())}, status=400)
        elif user_status not in UserEntry.USER_STATUSES.keys():
            return JsonResponse({'error': 'unrecognized status', 'details': '"user_status" should be one of these: {}'.format(get_possible_statuses())}, status=400)
        
        entry = UserEntry(festival_id=festival_id, user_id=user_id, user_status=user_status)
        try:
            entry.save()
            return JsonResponse({ 
                    'message': 'successfully created new user entry', 
                    'details': { 
                        'user_id': user_id, 
                        'user_status': entry.get_user_status_display(),
                        'festival_id': festival_id,
                }}, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'invalid festival_id', 'details': 'no festival with id "{}" found'.format(festival_id)}, status=404)
        except Exception:
            return JsonResponse({'error': 'something went wrong', 'details': 'unhandled error occured'}, status=500)
    else:
        user_id = get_current_user_details(request.COOKIES['access_token'])['id']
        try:
            UserEntry.objects.get(festival_id=festival_id, user_id=user_id).delete()
            return JsonResponse({ 
                        'message': 'successfully deleted user entry', 
                        'details': { 
                            'user_id': user_id, 
                            'festival_id': festival_id,
                    }}, status=204)
        except UserEntry.DoesNotExist:
            return JsonResponse({ 'error': 'no user entry found', 'details': 'no user entry with user_id: "{}" and festival_id: "{}" could be found'.format(user_id, festival_id)}, status=404)
        except Exception:
            return JsonResponse({ 'error': 'something went wrong', 'details': 'unhandled error occured'}, status=500)

@require_http_methods(["DELETE", "POST"])
def create_band_entry(request: HttpRequest, festival_id):
    if request.method == 'POST':
        band_id = parse_request_body(request).get('band_id')
        if band_id == None:
            return JsonResponse({'error': 'no band_id provided', 'details': 'valid "band_id" needs to be provided'}, status=400)
        
        entry = BandEntry(festival_id=festival_id, band_id=band_id)
        try:
            entry.save()
            return JsonResponse({ 
                    'message': 'successfully created new band entry', 
                    'details': { 
                        'band_id': band_id,
                        'festival_id': festival_id,
                }}, status=201)
        except IntegrityError:
            festival = Festival.objects.filter(id=festival_id)
            if len(festival) == 0:
                return JsonResponse({'error': 'invalid festival id', 'details': 'no festival with id "{}" found '.format(festival_id)}, status=404)
            else:
                return JsonResponse({'error': 'invalid band id', 'details': 'no band with id "{}" found'.format(band_id)}, status=404)
        except Exception:
            return JsonResponse({'error': 'something went wrong', 'details': 'unhandled error occured'}, status=500)
    else:
        band_id = parse_request_body(request).get('band_id')
        try:
            BandEntry.objects.get(festival_id=festival_id, band_id=band_id).delete()
            return JsonResponse({ 
                        'message': 'successfully deleted band entry', 
                        'details': { 
                            'user_id': band_id, 
                            'festival_id': festival_id,
                    }}, status=204)
        except BandEntry.DoesNotExist:
            return JsonResponse({ 'error': 'no user entry found', 'details': 'no user entry with band_id: "{}" and festival_id: "{}" could be found'.format(band_id, festival_id)}, status=404)
        except Exception:
            return JsonResponse({'error': 'something went wrong', 'details': 'unhandled error occured'}, status=500)

def get_possible_statuses():
    out = ''
    for k, v in UserEntry.USER_STATUSES.items():
        out += '"{}" for "{}",'.format(k, v)
    return out[:-1]
