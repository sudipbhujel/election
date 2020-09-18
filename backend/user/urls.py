from django.urls import path

from . import views
from rest_framework_simplejwt import views as jwt_views

app_name = 'user'

urlpatterns = [
    path('me/', views.ManageUserView.as_view(), name='me'),
    path('create/', views.RegistrationUserView.as_view(), name='create'),
    path('token/', views.CreateTokenObtainPairView.as_view(),
         name='token_obtain'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('face/', views.UserFaceImageView.as_view(), name='face'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('password_change/', views.ChangeUserPasswordView.as_view(),
         name='password_change'),
    path('reset_password/', views.ResetUserPasswordLinkView.as_view(),
         name='reset_password'),
    path('reset_password_confirm/<uidb64>/<token>/',
         views.ResetUserPasswordConfirmView.as_view(),
         name='reset_password_confirm')
]
