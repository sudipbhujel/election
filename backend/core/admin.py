from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import User


class UserAdmin(BaseUserAdmin):
    def _full_name(self, obj):
        return f'{obj.get_full_name}'

    ordering = ('id',)
    list_display = ('citizenship_number', 'email', '_full_name')
    search_fields = ('citizenship_number', 'email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_active', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('citizenship_number', 'email', 'password')}),
        (_('Personal Info'), {
         'fields': ('first_name', 'middle_name', 'last_name')}),
        (_('Permissions'), {
         'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('User Permissions'), {'fields': ('user_permissions',)}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('citizenship_number', 'email', 'password1', 'password2')
        }),
    )


admin.site.register(User, UserAdmin)
