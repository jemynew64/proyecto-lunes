# tienda/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, AnimeViewSet, UserAnimeFavoritesViewSet, 
    AnimeCategoriesViewSet, CategoryViewSet, CategoryPrivViewSet, 
    AnimePriUserViewset, SubscriptionViewSet, SubscriptionPrivViewSet,
    UserSubscriptionViewSet, UserSubscriptionPrivViewSet,
    add_to_favorites, remove_from_favorites, login, register, 
    purchase_subscription, is_user_subscribed, UserProfileView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'anime', AnimeViewSet, basename="anime")
router.register(r'useranimefavorites', UserAnimeFavoritesViewSet, basename="useranimefavorites")
router.register(r'animecategories', AnimeCategoriesViewSet, basename="animecategories")
router.register(r'category', CategoryViewSet, basename="category")
router.register(r'category-priv', CategoryPrivViewSet, basename="category-priv")
router.register(r'anime-public', AnimePriUserViewset, basename="anime-public")
router.register(r'subscriptions', SubscriptionViewSet, basename="subscriptions")
router.register(r'subscription-priv', SubscriptionPrivViewSet, basename="subscription-priv")
router.register(r'usersubscription', UserSubscriptionViewSet, basename="usersubscription")
router.register(r'usersubscription-priv', UserSubscriptionPrivViewSet, basename="usersubscription-priv")

urlpatterns = [
    path('login', login, name='login'),
    path('register', register, name='register'),
    path('favorites/add/<int:anime_id>/', add_to_favorites, name='add_to_favorites'),
    path('favorites/remove/<int:anime_id>/', remove_from_favorites, name='remove_from_favorites'),
    path('purchase/<int:subscription_id>/', purchase_subscription, name='purchase_subscription'),
    path('user/subscription-status/', is_user_subscribed, name='is_user_subscribed'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('', include(router.urls)),
]
