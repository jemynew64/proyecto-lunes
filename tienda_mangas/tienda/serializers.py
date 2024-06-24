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
    categories = serializers.SerializerMethodField()
    class Meta:
        model = Anime
        fields = '__all__'
    def get_categories(self, obj):
        return obj.animecategories_set.values_list('idCategory__name', flat=True)

class UserAnimeFavoritesSerializer(serializers.ModelSerializer):
    idAnime = AnimeSerializer(read_only=True)
    class Meta:
        model = UserAnimeFavorites
        fields = ['id', 'idUsuario', 'idAnime', 'is_favorite']
        
class AnimePublicSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    class Meta:
        model = Anime
        fields = '__all__'
    def get_categories(self, obj):
        return obj.animecategories_set.values_list('idCategory__name', flat=True)
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AnimeCategoriesSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)  # Asegúrate de incluir el campo `id`
    class Meta:
        model = AnimeCategories
        fields = ['id','idAnime','idCategory']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializer(source='idSubscription')
    class Meta:
        model = UserSubscription
        fields = '__all__'

class UserDetailSerializer(serializers.ModelSerializer):
    subscriptions = UserSubscriptionSerializer(many=True, source='usersubscription_set')

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'surname', 'email', 'role', 'subscriptions']

