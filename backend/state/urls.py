from django.urls import path

from . import views

app_name = 'state'

urlpatterns = [
    path('', views.StateView.as_view(), name='list'),
]
