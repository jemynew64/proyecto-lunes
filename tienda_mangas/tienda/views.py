from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserDetailSerializer, UserSerializer, AnimeSerializer, UserAnimeFavoritesSerializer , AnimePublicSerializer, CategorySerializer, AnimeCategoriesSerializer, SubscriptionSerializer, UserSubscriptionSerializer

# para el status
from rest_framework import status

# para las acciones
from rest_framework.decorators import action
from .models import User, Anime, UserAnimeFavorites, Category, AnimeCategories, Subscription, UserSubscription

# para permisos de quien puede verlo 
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly

# para crud
from rest_framework import viewsets
# agregado por mi como extra 

from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta
#########
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.exclude(role='administrador')
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        for user in response.data:
            user['password'] = '********'  # Mask the password in the response
        return response

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        response.data['password'] = '********'  # Mask the password in the response
        return response

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': UserSerializer(user).data
        })

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # Guardar el usuario
        user = serializer.save()

        # Crear el token de acceso y el token de actualización
        refresh = RefreshToken.for_user(user)

        # Devolver la respuesta con el token de acceso, el token de actualización y los datos del usuario serializados
        return Response({
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class AnimePriUserViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Anime.objects.all()
    serializer_class = AnimePublicSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        title = self.request.query_params.get('title')
        category = self.request.query_params.get('category')

        if title:
            queryset = queryset.filter(title__icontains=title)
        if category:
            queryset = queryset.filter(animecategories__idCategory__name__icontains=category)
        
        return queryset
class UserAnimeFavoritesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = UserAnimeFavorites.objects.all()
    serializer_class = UserAnimeFavoritesSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('userId')
        if user_id:
            return self.queryset.filter(idUsuario__id=user_id)
        return self.queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['idUsuario'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        serializer.save()

@api_view(['POST'])
def add_to_favorites(request, anime_id):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        anime = Anime.objects.get(id=anime_id)
    except Anime.DoesNotExist:
        return Response({"error": "Anime not found"}, status=status.HTTP_404_NOT_FOUND)

    user_anime, created = UserAnimeFavorites.objects.get_or_create(idUsuario_id=user_id, idAnime=anime, defaults={'is_favorite': True})
    if not created:
        user_anime.is_favorite = True
        user_anime.save()

    serializer = UserAnimeFavoritesSerializer(user_anime)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def remove_from_favorites(request, anime_id):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        anime = Anime.objects.get(id=anime_id)
    except Anime.DoesNotExist:
        return Response({"error": "Anime not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        user_anime = UserAnimeFavorites.objects.get(idUsuario_id=user_id, idAnime=anime)
        user_anime.is_favorite = False
        user_anime.save()
    except UserAnimeFavorites.DoesNotExist:
        return Response({"error": "Favorite entry not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserAnimeFavoritesSerializer(user_anime)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def is_user_subscribed(request):
    user_id = request.query_params.get('userId')
    if not user_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user_subscription = UserSubscription.objects.filter(idUser_id=user_id, activeStatus=True).exists()
        return Response({"isSubscribed": user_subscription}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def purchase_subscription(request, subscription_id):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        subscription = Subscription.objects.get(id=subscription_id)
    except Subscription.DoesNotExist:
        return Response({"error": "Subscription not found"}, status=status.HTTP_404_NOT_FOUND)

    user = User.objects.get(id=user_id)
    UserSubscription.objects.create(
        idUser=user,
        idSubscription=subscription,
        subscriptionDate=datetime.now(),
        terminationDate=datetime.now() + timedelta(days=30),  # Suscripción válida por 30 días
        activeStatus=True
    )

    return Response({"success": "Subscription purchased successfully"}, status=status.HTTP_200_OK)   
class AnimeListView(generics.ListAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimePublicSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class CategoryPrivViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class AnimeCategoriesViewSet(viewsets.ModelViewSet):
    queryset = AnimeCategories.objects.all()
    serializer_class = AnimeCategoriesSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class UserSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer

class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def get_object(self):
        return self.request.user



