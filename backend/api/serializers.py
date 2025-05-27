from rest_framework import serializers
from .models import Festival, Band, User, BandEntry, UserEntry, Vote
from .spotify_api.band import get_bands_details
from .spotify_api.user import get_user_details

class FestivalSerializer(serializers.ModelSerializer):
    bands = serializers.SerializerMethodField()
    users = serializers.SerializerMethodField()
    
    class Meta:
        model = Festival
        fields = ['id', 'name', 'start_date', 'end_date', 'place', 'bands', 'users']

    def get_bands(self, obj):
        access_token = self._context['request'].COOKIES['access_token']
        band_entries = BandEntry.objects.filter(festival_id=obj.id)
        return get_bands_details([band_entry.band.spotify_id for band_entry in band_entries], access_token)
    
    def get_users(self, obj):
        access_token = self._context['request'].COOKIES['access_token']
        user_entries = UserEntry.objects.filter(festival_id=obj.id)

        return [{ **get_user_details(user.user.spotify_id, access_token), 'user_status': user.get_user_status_display() } for user in user_entries]


class BandSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()
    votes = serializers.SerializerMethodField()

    class Meta:
        model = Band
        fields = ['spotify_id', 'details', 'votes']

    def get_details(self, obj):
        access_token = self._context['request'].COOKIES['access_token']
        return get_bands_details([obj.spotify_id], access_token)[0]
    
    def get_votes(self, obj):
        return [serialize_vote(vote) for vote in Vote.objects.filter(band_id=obj.spotify_id)]

def serialize_vote(vote):
    return {
        'user_id': vote.user.spotify_id,
        'user_nickname': vote.user.nickname,
        'vote': vote.get_vote_display(),
    }

class UserSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['spotify_id', 'nickname', 'details']

    def get_details(self, obj):
        access_token = self._context['request'].COOKIES['access_token']
        return get_user_details(obj.spotify_id, access_token)
