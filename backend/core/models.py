import os
import uuid

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import slugify
from django.core.validators import MinValueValidator

from .choices import DISTRICT_CHOICES, GENDER_CHOICES, PROVINCE_CHOICES


def user_face_image_file_path(instance, filename):
    """
    Generate file path for a user face image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/user/', str(instance.user), 'face', filename)


def user_citizenship_image_file_path(instance, filename):
    """
    Generate file path for a user citizenship image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/user/', str(instance.user),
                        'citizenship', filename)


def user_profile_image_file_path(instance, filename):
    """
    Generate file path for a user citizenship image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/user/', str(instance.user),
                        'profile', filename)


def party_logo_image_file_path(instance, filename):
    """
    Generate file path for a user citizenship image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    slug = str(slugify(instance.name))

    return os.path.join('uploads/party/', slug, 'logo', filename)


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
        return str(self.citizenship_number)


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


class Profile(models.Model):
    """
    A Profile models stores full featured details of voters.
    """
    id = models.UUIDField(_('id'), default=uuid.uuid4,
                          primary_key=True, editable=False)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    public_key = models.CharField(_('public key'), max_length=50, blank=True)

    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=30)
    image = models.ImageField(
        _('profile image'), upload_to=user_profile_image_file_path)
    gender = models.CharField(_('gender'),
                              max_length=15, choices=GENDER_CHOICES)
    dob = models.DateField(_('date of birth'))

    father_name = models.CharField(
        _('father\'s name'), max_length=30)
    mother_name = models.CharField(
        _('mother\'s name'), max_length=30)
    citizenship_issued_district = models.CharField(
        _('citizenship issued district'), max_length=15,
        choices=DISTRICT_CHOICES)
    citizenship = models.ImageField(
        _('citizenship image'), upload_to=user_citizenship_image_file_path)

    # Custom roles
    is_voter = models.BooleanField(_('voter'), default=False,
                                   help_text=_(
                                       'Designates whether the \
                                        user can vote.'))
    is_voted = models.BooleanField(_('voted'), default=False,
                                   help_text=_(
                                       'Designates whether the user \
                                        casted vote.'))

    # Address Information
    province = models.CharField(
        _('province number'), max_length=15, choices=PROVINCE_CHOICES)
    district = models.CharField(
        _('district'), max_length=15, choices=DISTRICT_CHOICES)
    municipality = models.CharField(
        _('municipality'), max_length=30)
    ward = models.IntegerField(_('ward number'))
    tole = models.CharField(_('tole'), max_length=30)

    # # Contact Information
    # phone = models.IntegerField(_('contact number'))

    # Dates
    date_submitted = models.DateTimeField(
        _('submission date'), default=timezone.now)
    date_edited = models.DateTimeField(
        _('edit date'), auto_now=True)

    @property
    def get_full_name(self):
        """
        Returns the first_name plus last_name, with a space in between.
        """
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()

    def __str__(self):
        return str(self.get_full_name)


class Party(models.Model):
    """
    A Party model stores political party informations.
    """
    id = models.UUIDField(_('id'), default=uuid.uuid4,
                          primary_key=True, editable=False)
    name = models.CharField(_('name'), max_length=25)
    description = models.TextField(_('description'))
    slogan = models.TextField(_('slogan'))
    logo = models.ImageField(
        _('logo'), upload_to=party_logo_image_file_path)
    manifesto = models.TextField(_('manifesto'))
    plans = models.TextField(_('plans'))

    vote_count = models.IntegerField(_('vote count'), default=0,
                                     validators=[MinValueValidator(0)])

    class Meta:
        verbose_name = _('party')
        verbose_name_plural = _('parties')

    @property
    def get_vote_count(self):
        """
        Returns the total vote count of party.
        """
        return f'{self.vote_count}'

    def __str__(self):
        return str(self.name)


class Candidate(models.Model):
    """
    A Candidate model stores candidate informations.
    """
    id = models.UUIDField(_('id'), default=uuid.uuid4,
                          primary_key=True, editable=False)
    profile = models.OneToOneField(
        Profile, on_delete=models.CASCADE, related_name='candidate')
    party = models.OneToOneField(
        Party, on_delete=models.CASCADE, related_name='party')
    bio = models.TextField(_('bio'))
    plans = models.TextField(_('plans'))

    # Role
    is_candidate = models.BooleanField(_('candidate'),
                                       default=False,
                                       help_text=_(
        'Designates whether the user is candidate'))

    vote_count = models.IntegerField(_('vote count'), default=0,
                                     validators=[MinValueValidator(0)])

    def __str__(self):
        return str(self.profile.get_full_name)
