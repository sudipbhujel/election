# Generated by Django 3.1 on 2020-09-27 12:02

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20200925_1834'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='id_card',
            field=models.ImageField(blank=True, upload_to=core.models.user_profile_id_card_file_path, verbose_name='id card'),
        ),
    ]
