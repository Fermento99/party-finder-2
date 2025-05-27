from django.db import models


class User(models.Model):
    spotify_id = models.CharField(max_length=50, primary_key=True)
    nickname = models.CharField(max_length=25)

class Band(models.Model):
    spotify_id = models.CharField(max_length=22, primary_key=True)

class Festival(models.Model):
    name = models.CharField(max_length=60)
    start_date = models.DateField()
    end_date = models.DateField()
    place = models.CharField(max_length=60)

class UserEntry(models.Model):
    USER_STATUSES = {
        'C': 'Considering',
        'G': 'Going',
    }

    pk = models.CompositePrimaryKey("festival_id", "user_id")
    festival = models.ForeignKey(Festival, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_status = models.CharField(max_length=1, choices=USER_STATUSES)

class BandEntry(models.Model):
    pk = models.CompositePrimaryKey("festival_id", "band_id")
    festival = models.ForeignKey(Festival, on_delete=models.CASCADE)
    band = models.ForeignKey(Band, on_delete=models.CASCADE)

class Vote(models.Model):
    VOTE_OPTIONS = {
        '1': 'absolutely need to see',
        '2': 'want to see',
        '3': 'could be interesting if works out',
        '4': 'on radar',
        '5': 'not interested'
    }

    pk = models.CompositePrimaryKey("band_id", "user_id")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    band = models.ForeignKey(Band, on_delete=models.CASCADE)
    vote = models.CharField(max_length=1, choices=VOTE_OPTIONS)