# tienda/serializers.py

from rest_framework import serializers
from .models import User, Anime, UserAnimeFavorites, Category, AnimeCategories, Subscription, UserSubscription
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
        fields = '__all__'

class UserAnimeFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnimeFavorites
        fields = ['idUsuario', 'idAnimes', 'is_favorite']
        
class AnimePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AnimeCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeCategories
        fields = ['idAnime','idCategory']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubscription
        fields = '__all__'

