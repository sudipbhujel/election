from celery import task
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from core.models import User

from .tokens import account_activation_token


@task
def user_created(user_id, current_site):
    """
    Tast to send an e-mail verification when
    an user is successfully created.
    """
    user = User.objects.get(id=user_id)
    protocol = 'http'
    domain = current_site.domain
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    subject = 'Verify your e-mail.'
    url = reverse('user:activate', kwargs={'uidb64': uid, 'token': token})
    message = f'Dear {user.first_name} \n' \
        f'Please click on link to confirm your registration, \n' \
        f'{protocol}://{domain}{url}'
    mail_sent = send_mail(
        subject,
        message,
        'admin@election.com',
        [user.email]
    )
    return mail_sent
