# Generated by Django 4.1.6 on 2023-04-06 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_files_time_files_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='Blogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=1000)),
                ('imgAddress', models.CharField(max_length=100)),
            ],
        ),
    ]
