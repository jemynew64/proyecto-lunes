from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from tienda.views import AnimeListView
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tienda.urls')),
    # Ruta para la API de anime (puede ser accedida públicamente)
    path('public/', AnimeListView.as_view())
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)