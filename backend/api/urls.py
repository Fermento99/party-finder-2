from django.urls import path

from .views import auth_views, band_views, festival_views, user_views

urlpatterns = [
    path('festivals/', festival_views.FestivalListCreate.as_view()),
    path('festivals/<int:festival_id>/', festival_views.FestivalDetails.as_view()),
    path('festivals/<int:festival_id>/follow', festival_views.create_user_entry),
    path('festivals/<int:festival_id>/bands', festival_views.create_band_entry),
    path('bands/', band_views.BandListCreate.as_view()),
    path('bands/<str:spotify_id>', band_views.BandDetails.as_view()),
    path('bands/<str:spotify_id>/vote', band_views.vote),
    path('add-bands-by-name', band_views.add_list),
    path('users/', user_views.UserList.as_view()),
    path('users/<str:spotify_id>', user_views.UserDetails.as_view()),
    path('user/', auth_views.user),
    path('login/', auth_views.SpotifyApiAuthenticator.login),
    path('spotify-callback/', auth_views.SpotifyApiAuthenticator.callback),
]
