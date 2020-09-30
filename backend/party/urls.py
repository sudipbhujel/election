from django.urls import path

from . import views

app_name = 'party'

urlpatterns = [
    path('', views.PartyListView.as_view(), name='list'),
    path('<str:id>/', views.PartyDetailView.as_view(), name='detail'),
]
