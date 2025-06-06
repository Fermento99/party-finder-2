import requests


def get_user_details(user_id, access_token):
    url = 'https://api.spotify.com/v1/users/' + user_id
    headers = { "Authorization": access_token }
    res = requests.get(url, headers=headers)

    return _serialize_user_details(res.json())

def get_current_user(access_token):
    url = 'https://api.spotify.com/v1/me'
    headers = { "Authorization": access_token }
    res = requests.get(url, headers=headers)

    return _serialize_user(res.json())

def _serialize_user(user):
    return {
        'spotify_id': user['id'],
        'details': _serialize_user_details(user)
    }

def _serialize_user_details(user):
    return {
        'display_name': user['display_name'],
        'url': user['external_urls']['spotify'],
        'images': user['images'],
    }
