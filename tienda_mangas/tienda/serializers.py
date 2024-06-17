# tienda/serializers.py

from rest_framework import serializers
from .models import User, Anime, UserAnimeFavorites
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'surname', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'required': False, 'default': 'usuario'} 
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))  # Encriptar la contraseña
        user = User.objects.create(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = ['idAnime', 'title', 'author', 'pub_year', 'description', 'img_route']

class UserAnimeFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnimeFavorites
        fields = ['idUsuario', 'idAnimes', 'is_favorite']
        
class AnimePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'

