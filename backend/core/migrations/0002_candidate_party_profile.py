# Generated by Django 3.1 on 2020-09-18 14:43

import core.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Party',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('name', models.CharField(max_length=25, verbose_name='name')),
                ('description', models.TextField(verbose_name='description')),
                ('slogan', models.TextField(verbose_name='slogan')),
                ('logo', models.ImageField(upload_to=core.models.party_logo_image_file_path, verbose_name='logo')),
                ('manifesto', models.TextField(verbose_name='manifesto')),
                ('plans', models.TextField(verbose_name='plans')),
                ('vote_count', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='vote count')),
            ],
            options={
                'verbose_name': 'party',
                'verbose_name_plural': 'parties',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('first_name', models.CharField(max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(max_length=30, verbose_name='last name')),
                ('image', models.ImageField(upload_to=core.models.user_profile_image_file_path, verbose_name='profile image')),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('others', 'Others')], max_length=15, verbose_name='gender')),
                ('dob', models.DateField(verbose_name='date of birth')),
                ('father_name', models.CharField(max_length=30, verbose_name="father's name")),
                ('mother_name', models.CharField(max_length=30, verbose_name="mother's name")),
                ('citizenship_issued_district', models.CharField(choices=[('dolakha', 'Dolakha'), ('bhaktapur', 'Bhaktapur'), ('kathmandu', 'Kathmandu'), ('lalitpur', 'Lalitpur')], max_length=15, verbose_name='citizenship issued district')),
                ('citizenship', models.ImageField(upload_to=core.models.user_citizenship_image_file_path, verbose_name='citizenship image')),
                ('is_voter', models.BooleanField(default=False, help_text='Designates whether the user can vote.', verbose_name='voter')),
                ('is_voted', models.BooleanField(default=False, help_text='Designates whether the user casted vote.', verbose_name='voted')),
                ('province', models.CharField(choices=[('1', 'Province 1'), ('2', 'Province 2'), ('3', 'Bagmati'), ('4', 'Gandaki'), ('5', 'Province 5'), ('6', 'Karnali'), ('7', 'Sudurpashchim')], max_length=15, verbose_name='province number')),
                ('district', models.CharField(choices=[('dolakha', 'Dolakha'), ('bhaktapur', 'Bhaktapur'), ('kathmandu', 'Kathmandu'), ('lalitpur', 'Lalitpur')], max_length=15, verbose_name='district')),
                ('municipality', models.CharField(max_length=30, verbose_name='municipality')),
                ('ward', models.IntegerField(verbose_name='ward number')),
                ('tole', models.CharField(max_length=30, verbose_name='tole')),
                ('date_submitted', models.DateTimeField(default=django.utils.timezone.now, verbose_name='submission date')),
                ('date_edited', models.DateTimeField(auto_now=True, verbose_name='edit date')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('bio', models.TextField(verbose_name='bio')),
                ('plans', models.TextField(verbose_name='plans')),
                ('is_candidate', models.BooleanField(default=False, help_text='Designates whether the user is candidate', verbose_name='candidate')),
                ('vote_count', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='vote count')),
                ('party', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='party', to='core.party')),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='candidate', to='core.profile')),
            ],
        ),
    ]
