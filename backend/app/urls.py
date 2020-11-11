from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/profile/', include('eprofile.urls')),
    path('api/vote/', include('vote.urls')),
    path('api/candidates/', include('candidate.urls')),
    path('api/parties/', include('party.urls')),
    path('api/state/', include('state.urls')),
    path('api/stats/', include('stats.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
