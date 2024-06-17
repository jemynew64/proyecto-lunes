# tienda/urls.py

from django.urls import path, include
from .views import login,register
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AnimeViewSet, UserAnimeFavoritesViewSet, AnimeCategoriesViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'anime', AnimeViewSet)
router.register(r'useranimefavorites', UserAnimeFavoritesViewSet)
router.register(r'animecategories', AnimeCategoriesViewSet)

urlpatterns = [
    path('login', login, name='login'),
    path('register', register, name='register'),
    path('', include(router.urls)),
]
