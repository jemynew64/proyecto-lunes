# Generated by Django 5.0.6 on 2024-06-17 02:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='nombre para logearte')),
                ('name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Name')),
                ('surname', models.CharField(blank=True, max_length=200, null=True, verbose_name='Surname')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, unique=True, verbose_name='Email')),
                ('role', models.CharField(choices=[('administrador', 'Administrador'), ('usuario', 'Usuario')], default='usuario', max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('idAnime', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=45)),
                ('author', models.CharField(max_length=45)),
                ('pub_year', models.CharField(max_length=45)),
                ('description', models.TextField()),
                ('img_route', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'Anime',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('idCategory', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=80)),
                ('img_route', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'Category',
            },
        ),
        migrations.CreateModel(
            name='AnimeCategories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idAnime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.anime')),
                ('idCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.category')),
            ],
        ),
        migrations.CreateModel(
            name='UserAnimeFavorites',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_favorite', models.BooleanField()),
                ('idAnime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tienda.anime')),
                ('idUsuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserAnimeFavorites',
            },
        ),
    ]
