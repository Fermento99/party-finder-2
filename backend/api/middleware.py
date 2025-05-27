from django.http import HttpRequest, HttpResponse
from .spotify_api.auth import get_access_token
from .utils import expand_cookies


AUTHORIZED_PATH_ROOT = '/api/'

EXCLUDED_PATHS = [
    '/api/login',
    '/api/spotify_callback'
]

def auth_middleware(get_response):
    def middleware(request: HttpRequest):
        if request.path.startswith(AUTHORIZED_PATH_ROOT) and True not in [request.path.startswith(path) for path in EXCLUDED_PATHS]:
            access_token = request.COOKIES.get('access_token')
            refresh_token = request.COOKIES.get('refresh_token')
            response: HttpResponse | None = None

            if access_token != None:
                response = get_response(request)
            elif refresh_token != None:
                token_data = get_access_token(refresh_token=refresh_token)
                request.COOKIES['access_token'] = token_data['access_token']
                response = get_response(request)
                expand_cookies(response.cookies, token_data)
            else:
                return HttpResponse('401 Unauthorized', status=401)

            return response
        else:
            return get_response(request)
    
    return middleware
