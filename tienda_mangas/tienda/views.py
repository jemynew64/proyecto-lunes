from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, AnimeSerializer, UserAnimeFavoritesSerializer , AnimePublicSerializer, CategorySerializer, AnimeCategoriesSerializer

# para el status
from rest_framework import status

# para las acciones
from rest_framework.decorators import action
from .models import User, Anime, UserAnimeFavorites, Category, AnimeCategories

# para permisos de quien puede verlo 
from rest_framework.permissions import IsAuthenticated,IsAdminUser

# para crud
from rest_framework import viewsets
# agregado por mi como extra 

from rest_framework_simplejwt.tokens import RefreshToken
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

class UserAnimeFavoritesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = UserAnimeFavorites.objects.all()
    serializer_class = UserAnimeFavoritesSerializer
    
class AnimeListView(generics.ListAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimePublicSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AnimeCategoriesViewSet(viewsets.ModelViewSet):
    queryset = AnimeCategories.objects.all()
    serializer_class = AnimeCategoriesSerializer



