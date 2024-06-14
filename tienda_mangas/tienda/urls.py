# tienda/urls.py

from django.urls import path, include
from .views import login,register
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('login', login, name='login'),
    path('register', register, name='register'),
    path('', include(router.urls)),
]
