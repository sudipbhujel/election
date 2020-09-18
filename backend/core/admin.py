from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import Candidate, FaceImage, Party, Profile, User


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


class ProfileAdmin(admin.ModelAdmin):
    date_hierarchy = ('date_submitted')
    readonly_fields = ('date_submitted', 'date_edited', )
    list_display = ('id', 'first_name', 'last_name', 'is_voter', 'is_voted')
    search_fields = ('first_name', 'last_name', 'municipality', 'tole')
    list_filter = ('is_voter', 'is_voted', 'gender')
    fieldsets = (
        (_('Personal Info'), {'fields': ('user', 'first_name', 'last_name',
                                         'dob', 'gender',
                                         'citizenship_issued_district',
                                         'citizenship')}),
        (_('Address info'), {
         'fields': (('province', 'district'), ('municipality', 'ward'),
                    'tole')}),
        (_('Roles'), {
         'fields': ('is_voter', 'is_voted')}),
        (_('Dates'), {'fields': ('date_submitted', 'date_edited')}),
    )

    radio_fields = {'gender': admin.HORIZONTAL}


class PartyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    fieldsets = (
        (None, {'fields': ('name', 'description', 'slogan', 'logo')}),
        (_('Election Info'), {
         'fields': ('manifesto', 'plans')}),
        (_('Vote'), {
         'fields': ('vote_count',)}),
    )


class CandidateAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name')
    list_filter = ('is_candidate',)
    fieldsets = (
        (_('Personal Info'), {'fields': ('profile', 'party', 'bio', 'plans')}),
        (_('Role'), {
         'fields': ('is_candidate',)}),
        (_('Vote'), {
         'fields': ('vote_count',)}),
    )

    def full_name(self, obj):
        return f'{obj.profile.get_full_name}'


admin.site.register(User, UserAdmin)
admin.site.register(FaceImage, FaceImageAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Party, PartyAdmin)
admin.site.register(Candidate, CandidateAdmin)
