from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from django.contrib import admin
from user_api import views
from django.conf.urls import include


urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', include('user_api.urls')),
    path('auth/', obtain_auth_token)
]
