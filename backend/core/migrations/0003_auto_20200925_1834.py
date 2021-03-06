# Generated by Django 3.1 on 2020-09-25 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_candidate_party_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='public_key',
            field=models.CharField(blank=True, max_length=50, verbose_name='public key'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='is_voted',
            field=models.BooleanField(default=False, help_text='Designates whether the user                                         casted vote.', verbose_name='voted'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='is_voter',
            field=models.BooleanField(default=False, help_text='Designates whether the                                         user can vote.', verbose_name='voter'),
        ),
    ]
