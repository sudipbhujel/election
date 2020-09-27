import logging

from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from .tokens import account_activation_token, password_reset_token


@shared_task
def user_created(user_id, domain):
    """
    Task to send an e-mail verification when
    an user is successfully created.
    """
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(id=user_id)
        print(user)
        protocol = 'http'
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        subject = 'Verify your e-mail.'
        url = reverse('user:activate', kwargs={'uidb64': uid, 'token': token})
        message = f'Dear {user.citizenship_number} \n' \
            f'Please click on link to confirm your registration, \n' \
            f'{protocol}://{domain}{url}'
        send_mail(
            subject,
            message,
            'admin@election.com',
            [user.email],
            fail_silently=False
        )
    except UserModel.DoesNotExist:
        logging.warning(
            "Tried to send verification email to non-existing user '%s'" % user_id)


@shared_task
def reset_password_created(user_id, domain):
    """
    Task to send e-mail with password reset link.
    """
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(id=user_id)
        print(user)
        protocol = 'http'
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = password_reset_token.make_token(user)
        subject = 'Reset your password'
        url = reverse('user:reset_password_confirm', kwargs={
            'uidb64': uid, 'token': token})
        message = f'Dear {user.citizenship_number} \n' \
            f'Please click on link to reset your password, \n' \
            f'{protocol}://{domain}{url}'
        send_mail(
            subject,
            message,
            'admin@election.com',
            [user.email],
            fail_silently=False,
        )
    except UserModel.DoesNotExist:
        logging.warning(
            "Tried to send verification email to non-existing user '%s'" % user_id)
