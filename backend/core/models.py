import os
import uuid

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


def user_face_image_file_path(instance, filename):
    """
    Generate file path for a user face image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/user/', str(instance.user), 'face', filename)


class UserManager(BaseUserManager):
    def _create_user(self, citizenship_number, email, password, is_staff,
                     is_superuser, **extra_fields):
        """
        Creates and saves a User with the given citizenship number,
        email and password.
        """
        now = timezone.now()
        if not email or not citizenship_number:
            raise ValueError(
                'The user must have citizenship_number and email.')
        email = self.normalize_email(email)
        user = self.model(citizenship_number=citizenship_number,
                          email=email,
                          is_staff=is_staff,
                          is_active=True,
                          is_superuser=is_superuser,
                          last_login=now,
                          date_joined=now,
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self,
                    citizenship_number,
                    email,
                    password=None,
                    **extra_fields):
        return self._create_user(citizenship_number, email, password, False,
                                 False, **extra_fields)

    def create_superuser(self, citizenship_number, email, password,
                         **extra_fields):
        return self._create_user(citizenship_number, email, password, True,
                                 True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    A fully featured User model with admin-compliant permissions that uses a
    citizenship number as the username.
    Citizenship Number, email and password are required. Other fields are
    optional.
    """
    id = models.UUIDField(_('id'), default=uuid.uuid4,
                          primary_key=True, editable=False)
    citizenship_number = models.IntegerField(_('citizenship number'),
                                             unique=True)
    email = models.EmailField(_('email address'), max_length=254, unique=True)

    is_staff = models.BooleanField(_('staff status'),
                                   default=False,
                                   help_text=_('Designates whether the'
                                               'user can log into this'
                                               'admin site.'))
    is_active = models.BooleanField(_('active'),
                                    default=True,
                                    help_text=_(
                                        'Designates whether this'
                                        'user should be treated'
                                        'as active. Unselect this'
                                        'instead of deleting accounts'))

    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'citizenship_number'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return str(self.id)


class FaceImage(models.Model):
    """
    A face model stores user face image for face identification
    """
    id = models.UUIDField(_('id'), default=uuid.uuid4,
                          primary_key=True, editable=False)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='faceimage')
    image = models.ImageField(
        _('face image'), upload_to=user_face_image_file_path)

    def __str__(self):
        return str(self.id)
