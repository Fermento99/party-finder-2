from django.http import HttpRequest, HttpResponseNotAllowed, JsonResponse, HttpResponse
from django.shortcuts import redirect
from ..models import User
from ..spotify_api.auth import get_login_link, get_access_token
from ..spotify_api.user import get_current_user
from ..utils import expand_cookies


class SpotifyApiAuthenticator:
    states = []
    redirect_request: HttpRequest | None = None

    @staticmethod
    def checkState(state):
        try:
            index = SpotifyApiAuthenticator.states.index(state)
            SpotifyApiAuthenticator.states.pop(index)
            return True
        except:
            return False

    @staticmethod
    def login(request: HttpRequest):
        if request.method != 'GET':
            return HttpResponseNotAllowed(permitted_methods=['GET'])
            
        link, state = get_login_link()
        SpotifyApiAuthenticator.states.append(state)

        return redirect(link)

    @staticmethod
    def callback(request: HttpRequest):
        if not SpotifyApiAuthenticator.checkState(request.GET.get('state')):
            return JsonResponse({ 'message': 'Invalid state' }, status="400")
        
        if request.GET.get('error'):
            return JsonResponse(request.GET, status="401")
        
        token_data = get_access_token(code=request.GET.get('code'))

        user_data = get_current_user(access_token=token_data['access_token'])
        if not User.objects.filter(spotify_id=user_data['spotify_id']).exists():
            new_user = User(spotify_id=user_data['spotify_id'], nickname=user_data['details']['display_name'])
            new_user.save()

        res = redirect('/home')
        expand_cookies(res.cookies, token_data)

        return res

def user(request: HttpRequest):
    user_data = get_current_user(access_token=request.COOKIES['access_token'])
    user_data['nickname'] = User.objects.get(spotify_id=user_data['spotify_id']).nickname
    
    return JsonResponse(user_data)


def logout(request: HttpRequest):
    res = JsonResponse({ 'message': 'succesfully logged out' }, status=200)
    res.delete_cookie('access_token')
    res.delete_cookie('refresh_token')

    return res