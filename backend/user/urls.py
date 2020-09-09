from django.urls import path

from . import views

app_name = 'user'

urlpatterns = [
    path('me/', views.ManageUserView.as_view(), name='me'),
    path('create/', views.RegistrationUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('face/', views.UserFaceImageView.as_view(), name='face')
]
