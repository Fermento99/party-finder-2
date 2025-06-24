import requests

class BandNotFound(Exception):
    pass

def get_band_by_name(bandname: str, access_token, limit=1):
    url = 'https://api.spotify.com/v1/search'
    params = {
        "q": '"{}"'.format(bandname),
        "type": "artist",
        "limit": limit,
    }
    headers = { "Authorization": access_token }
    response = requests.get(url, params=params, headers=headers)

    return _get_band_id(response, bandname, limit > 1)

def _get_band_id(response, bandname: str, suggestions: bool):
    if not response.ok:
        print('bad response from spotify api', response.json())
        return None
    
    response_body = response.json()['artists']['items']
    band_details = response_body[0]

    if band_details['name'].lower() != bandname.lower():
        print('name mismatch "{}" "{}"'.format(band_details['name'].lower(), bandname.lower()))

        if suggestions:
            return [{'id': band['id'], 'name': band['name']} for band in response_body]
        else:
            return None
    
    return band_details['id']


def get_bands_details(band_ids: list[str], access_token):
    if len(band_ids) == 0:
        return []
    
    groups = []
    i = 0

    while (i+1)*50 < len(band_ids):
        groups.extend(_get_50_bands_details(band_ids[i*50:(i+1)*50], access_token))
        i += 1
    groups.extend(_get_50_bands_details(band_ids[i*50:], access_token))

    return groups
    

def _get_50_bands_details(band_ids, access_token):
    url = ''
    params = None
    single_band = len(band_ids) == 1

    if single_band:
        url = 'https://api.spotify.com/v1/artists/' + band_ids[0]
    else:
        url = 'https://api.spotify.com/v1/artists'
        params = { 'ids':  ','.join(band_ids) }
    
    headers = { "Authorization": access_token }
    response = requests.get(url, params=params, headers=headers)
    return _serialize_bands(response, single_band)

def _serialize_band(band_data):
    return {
        'spotify_id': band_data['id'],
        'details': _serialize_details(band_data)
    }

def _serialize_details(band_data):
    return {
        'name': band_data['name'],
        'followers': band_data['followers']['total'],
        'genres': ', '.join(band_data['genres']),
        'images': band_data['images'],
        'url': band_data['external_urls']['spotify'],
    }

def _serialize_bands(response, single_band):
    if not response.ok:
        raise BandNotFound(response.json())

    out = []
    if single_band:
        out = [_serialize_details(response.json())]
    else:
        for band in response.json()['artists']:
            out.append(_serialize_band(band))

    return out