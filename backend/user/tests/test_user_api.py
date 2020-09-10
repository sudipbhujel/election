from unittest.case import TestCase

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')
PWD_CHANGE_URL = reverse('user:password_change')


def create_user(**params):
    return get_user_model().objects.create_user(**params)

# class PublicUserAPITests(TestCase):
#     """Test the user API"""

#     def setUp(self):
#         self.client = APIClient()

#     def test_create_valid_user_success(self):
#         """
#         Test creating user with valid payload is successful
#         """
#         payload = {
#             'citizenship_number': 1,
#             'email': 'test@election.com',
#             'password': 'test123',
#             'first_name': 'Test'
#         }


class PrivateUserAPITests(TestCase):
    """
    Test API requests that require authentication
    """

    def setUp(self):
        self.user = create_user(
            citizenship_number=577,
            email='test@election.com',
            password='test123',
            first_name='test',
            last_name='Name'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_sucess(self):
        """
        Test retrieving profile for logged in user.
        """
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'citizenship_number': self.user.citizenship_number,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        })
        self.user.delete()

    def test_post_me_not_allowed(self):
        """
        Test that POST is not allowed in user/me endpoint.
        """
        res = self.client.post(ME_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.user.delete()

    def test_update_user_profile(self):
        """
        Test updating the user profile for authenticated user.
        """
        payload = {
            'first_name': 'Updated Name',
            'password': 'newpassword123'
        }

        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, payload['first_name'])
        self.assertTrue(res.status_code, status.HTTP_200_OK)
        self.user.delete()

    def test_post_change_pwd_not_allowed(self):
        """
        Test that POST is not allowed in user/password_change.
        """
        res = self.client.post(PWD_CHANGE_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.user.delete()

    def test_change_password_invalid_old_password(self):
        """
        Test that changing password with invalid old password.
        """
        payload = {
            'old_password': '',
            'new_password1': 'Thrive@123',
            'new_password2': 'Thrive@123'
        }
        res = self.client.put(PWD_CHANGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.delete()

    def test_chanage_password_empty_new_password(self):
        """
        Test that changing password with empty new password.
        """
        payload = {
            'old_password': 'test123',
            'new_password1': '',
            'new_password2': ''
        }
        res = self.client.put(PWD_CHANGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.delete()

    def test_change_password_with_short_new_password(self):
        """
        Test that changing password with short new password.
        """
        payload = {
            'old_password': 'test123',
            'new_password1': 'pw',
            'new_password2': 'pw'
        }
        res = self.client.put(PWD_CHANGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.delete()

    def test_change_password_with_valid_new_password(self):
        """
        Test that changing password with valid new password.
        """
        payload = {
            'old_password': 'test123',
            'new_password1': 'Thrive@123',
            'new_password2': 'Thrive@123'
        }
        res = self.client.put(PWD_CHANGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.user.delete()
