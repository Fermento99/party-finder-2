import json
from django.http import SimpleCookie, HttpRequest
from .models import Vote

COOKIE_KEYS = [
    'access_token',
    'refresh_token',
]

def expand_cookies(cookies: SimpleCookie, data: dict | None):
    if data == None:
        return

    for key in COOKIE_KEYS:
        if key in data.keys():
            if key == 'access_token':
                cookies[key] = data[key]
                cookies[key]['max-age'] = data['expires_in'] - 10
            else:
                cookies[key] = data[key]
                cookies[key]['max-age'] = 2592000

            cookies[key]['httponly'] = True
            cookies[key]['path'] = '/'

def parse_request_body(request: HttpRequest): return json.loads(request.body.decode('utf-8')) if request.body.decode('utf-8') else {}
