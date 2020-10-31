from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail


@shared_task
def vote_succeeded(user_id):
    """
    Task to send an e-mail when the voter vote their candidate.
    """
    UserModel = get_user_model()

    user = UserModel.objects.get(id=user_id)
    subject = 'Voted Successfully.'
    message = f'Dear {user.citizenship_number} \n' \
        f'You have successfully voted.'
    send_mail(
        subject,
        message,
        'admin@election.com',
        [user.email],
        fail_silently=False
    )
    return True
