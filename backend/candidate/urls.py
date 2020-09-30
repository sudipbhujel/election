from django.urls import path

from . import views

app_name = 'candidate'

urlpatterns = [
    path('', views.CandidateListView.as_view(), name='list'),
    path('<str:id>/', views.CandidateDetailView.as_view(), name='detail'),
]
