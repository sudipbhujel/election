from django.test import TestCase
from django.contrib.auth import get_user_model


class ModelTests(TestCase):
    def test_create_user_with_citizenship_and_email_successful(self):
        """Test creating user with their citizenship number and email"""
        citizenship_number = 1
        email = 'test@election.com'
        password = 'test123'
        user = get_user_model().objects.create_user(
            citizenship_number=citizenship_number,
            email=email,
            password=password
        )

        self.assertEqual(user.citizenship_number, citizenship_number)
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalize(self):
        """Test that the email for new user is normalized"""
        email = 'test@ELECTION.com'
        user = get_user_model().objects.create_user(1, email, 'Test123')

        self.assertEqual(user.email, email.lower())

    def test_create_new_super_user(self):
        """Test creating a new super user"""
        user = get_user_model().objects.create_superuser(
            1,
            'super@election.com',
            'test123'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.check_password('test123'))
