import requests


def get_user_details(user_id, access_token):
    url = 'https://api.spotify.com/v1/users/' + user_id
    headers = { "Authorization": access_token }
    res = requests.get(url, headers=headers)

    return _serialize_user(res.json())

def get_current_user_details(access_token):
    url = 'https://api.spotify.com/v1/me'
    headers = { "Authorization": access_token }
    res = requests.get(url, headers=headers)

    return _serialize_user(res.json())

def _serialize_user(user):
    return {
        'id': user['id'],
        'display_name': user['display_name'],
        'url': user['external_urls']['spotify'],
        'images': user['images'],
    }
