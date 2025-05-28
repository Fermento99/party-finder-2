from rest_framework import serializers
from .models import Festival, Band, User, BandEntry, UserEntry, Vote
from .spotify_api.band import get_bands_details
from .spotify_api.user import get_user_details

class FestivalSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    bands = serializers.SerializerMethodField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if type(self.context['view']).__name__ == 'FestivalListCreate' :
            self.fields.pop('bands')
    
    class Meta:
        model = Festival
        fields = ['id', 'name', 'start_date', 'end_date', 'place', 'bands', 'users']

    def get_bands(self, obj):
        access_token = self._context['request'].COOKIES['access_token']
        band_entries = BandEntry.objects.filter(festival_id=obj.id)
        band_data = get_bands_details([band_entry.band.spotify_id for band_entry in band_entries], access_token)
        for band in band_data:
            band['votes'] = [VoteSerializer(vote).data for vote in Vote.objects.filter(band_id=band['id'])]
        return band_data
    
    def get_users(self, obj):
        user_entries = UserEntry.objects.filter(festival_id=obj.id)
        return [UserEntrySerializer(user_entry).data for user_entry in user_entries]
    
class UserEntrySerializer(serializers.ModelSerializer):
    user_nickname = serializers.SerializerMethodField()
    user_status_display = serializers.SerializerMethodField()

    class Meta:
        model = UserEntry
        fields = ['festival_id', 'user_id', 'user_nickname', 'user_status_display', 'user_status']

    def get_user_nickname(self, obj):
        return obj.user.nickname
    
    def get_user_status_display(self, obj):
        return obj.get_user_status_display()


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
        return [VoteSerializer(vote).data for vote in Vote.objects.filter(band_id=obj.spotify_id)]

class VoteSerializer(serializers.ModelSerializer):
    user_nickname = serializers.SerializerMethodField()
    vote_display = serializers.SerializerMethodField()

    class Meta:
        model = Vote
        fields = ['band_id', 'user_id','user_nickname', 'vote', 'vote_display']

    def get_user_nickname(self, obj):
        return obj.user.nickname
    
    def get_vote_display(self, obj):
        return obj.get_vote_display()

class UserSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['spotify_id', 'nickname', 'details']

    def get_details(self, obj):
        access_token = self._context['request'].COOKIES['access_token']
        return get_user_details(obj.spotify_id, access_token)
