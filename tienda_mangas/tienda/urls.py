# tienda/urls.py

from django.urls import path, include
from .views import login,register
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AnimeViewSet, UserAnimeFavoritesViewSet, AnimeCategoriesViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'anime', AnimeViewSet, basename="anime")
router.register(r'useranimefavorites', UserAnimeFavoritesViewSet, basename="useranimefavorites")
router.register(r'animecategories', AnimeCategoriesViewSet, basename="animecategories")
router.register(r'category', CategoryViewSet, basename="category")

urlpatterns = [
    path('login', login, name='login'),
    path('register', register, name='register'),
    path('', include(router.urls)),
]
