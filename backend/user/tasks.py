from celery import task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from .tokens import account_activation_token, password_reset_token


@task
def user_created(user_id, current_site):
    """
    Task to send an e-mail verification when
    an user is successfully created.
    """
    user = get_user_model().objects.get(id=user_id)
    protocol = 'http'
    domain = current_site.domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    subject = 'Verify your e-mail.'
    url = reverse('user:activate', kwargs={'uidb64': uid, 'token': token})
    message = f'Dear {user.citizenship_number} \n' \
        f'Please click on link to confirm your registration, \n' \
        f'{protocol}://{domain}{url}'
    mail_sent = send_mail(
        subject,
        message,
        'admin@election.com',
        [user.email]
    )
    return mail_sent


@task
def reset_password_created(user_id, current_site):
    """
    Task to send e-mail with password reset link.
    """
    user = get_user_model().objects.get(id=user_id)
    protocol = 'http'
    domain = current_site.domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = password_reset_token.make_token(user)
    subject = 'Reset your password'
    url = reverse('user:reset_password_confirm', kwargs={
                  'uidb64': uid, 'token': token})
    message = f'Dear {user.citizenship_number} \n' \
        f'Please click on link to reset your password, \n' \
        f'{protocol}://{domain}{url}'
    mail_sent = send_mail(
        subject,
        message,
        'admin@election.com',
        [user.email]
    )
    return mail_sent
