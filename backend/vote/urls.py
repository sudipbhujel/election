from django.urls import path

from . import views

app_name = 'vote'

urlpatterns = [
    path('', views.VoteView.as_view(), name='vote'),
    path('validate/card/',
         views.ValidateIdView.as_view(),
         name='vote_validate'),
]
