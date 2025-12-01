"""
URL configuration for projeto project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from app.views import CookieTokenObtainPairView, LogoutView

print(">>> Views importadas:", CookieTokenObtainPairView)

urlpatterns = [
    path('admin/', admin.site.urls),

    #URLs djoser
    path("auth/jwt/create/", CookieTokenObtainPairView.as_view(), name="jwt-create"), #Sobrescreve a url do djoser para usar minha view
    path("auth/jwt/logout/", LogoutView.as_view(), name="jwt-logout"),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    #URLs drf spectacular
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    #Minhas URLs
    path('api/', include('app.urls'))
]
