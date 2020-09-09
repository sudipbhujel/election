from django.contrib.auth import get_user_model
from django.urls import reverse


CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')


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
