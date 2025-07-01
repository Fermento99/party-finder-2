import urllib.parse, random
import requests
import os
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv


load_dotenv(".env")

def get_login_link():
    url = 'https://accounts.spotify.com/authorize?'
    state = _random_string(16)
    params = {
        'response_type': 'code',
        'client_id': os.environ.get('CLIENT_ID'),
        'redirect_uri': os.environ.get('REDIRECT_URI'),
        'state': state,
    }

    return url + urllib.parse.urlencode(params), state

def get_access_token(code=None, refresh_token=None):
    url = 'https://accounts.spotify.com/api/token'
    params = {}

    if code:
        params = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': os.environ.get('REDIRECT_URI'),
        }
    elif refresh_token:
        params = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
    else:
        raise Exception('No "code" nor "refresh_token" provided')
    
    auth = HTTPBasicAuth(os.environ.get('CLIENT_ID'), os.environ.get('CLIENT_SECRET'))
    headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }

    res = requests.post(url, params=urllib.parse.urlencode(params), headers=headers, auth=auth)

    return _serialize_tokens(res.json())

def _serialize_tokens(data: dict):
    refresh_token = data.get('refresh_token')

    out = {
        'access_token': data['token_type'] + ' ' + data['access_token'],
        'expires_in': data['expires_in'],
    }

    if refresh_token != None:
        out['refresh_token'] = refresh_token

    return out

def _random_string(length):
    return ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890', k=length))

