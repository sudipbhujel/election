from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import FaceImage, User


class InlineFaceImage(admin.StackedInline):
    model = FaceImage


class UserAdmin(BaseUserAdmin):
    inlines = [InlineFaceImage, ]
    ordering = ('citizenship_number',)
    list_display = ('id', 'citizenship_number', 'email')
    list_display_links = ('id', 'citizenship_number')
    search_fields = ('citizenship_number', 'email')
    list_filter = ('is_staff', 'is_active', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('citizenship_number', 'email', 'password')}),
        (_('Permissions'), {
         'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('User Permissions'), {'fields': ('user_permissions',)}),
        (_('Important dates'), {'classes': ('collapse', 'extrapretty'),
                                'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('citizenship_number', 'email', 'password1', 'password2')
        }),
    )


class FaceImageAdmin(admin.ModelAdmin):
    def _citizenship_number(self, obj):
        return obj.user.citizenship_number
    list_display = ('id', '_citizenship_number')
    list_display_links = ('id',)


admin.site.register(User, UserAdmin)
admin.site.register(FaceImage, FaceImageAdmin)
