from django.urls import path

from . import views

app_name = 'vote'

urlpatterns = [
    path('', views.VoteView.as_view(), name='vote'),
]
