from django.contrib import admin
from .models import User, Anime, UserAnimeFavorites, Category, AnimeCategories, Subscription, UserSubscription

# Opción básica de registro
admin.site.register(User)
admin.site.register(Anime)
admin.site.register(UserAnimeFavorites)
admin.site.register(Category)
admin.site.register(AnimeCategories)
admin.site.register(Subscription)
admin.site.register(UserSubscription)