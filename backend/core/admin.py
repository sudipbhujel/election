
from io import BytesIO

from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.core.files.base import ContentFile
from django.core.mail import message
from django.http import HttpResponseRedirect
from django.utils.translation import ugettext_lazy as _

from ethereum.accounts import create_account
from ethereum.manager import Manager
from id.id import ID

from .models import Candidate, FaceImage, Party, Profile, User
from .tasks import id_generated
from .utils import base64_encode

from django.utils.safestring import mark_safe


def image_content(image):
    """
    Changes Pillow image to ContentFile. \
        Django image field can make use of it.
    """
    img_io = BytesIO()
    image.save(img_io, format='JPEG')
    return ContentFile(img_io.getvalue())


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
    change_form_template = "admin/eprofile/profile/change_form.html"
    date_hierarchy = ('date_submitted')
    readonly_fields = ('date_submitted', 'date_edited', 'is_voter', 'is_voted')
    list_display = ('id', 'first_name', 'last_name', 'is_voter', 'is_voted')
    search_fields = ('first_name', 'last_name', 'municipality', 'tole')
    list_filter = ('is_voter', 'is_voted', 'gender')
    fieldsets = (
        (_('Personal Info'), {'fields': ('user', 'public_key', 'first_name',
                                         'last_name', 'dob', 'gender',
                                         'citizenship_issued_district',
                                         'citizenship')}),
        (_('Images'), {'fields': ('image', 'id_card')}),
        (_('Address info'), {
         'fields': (('province', 'district'), ('municipality', 'ward'),
                    'tole')}),
        (_('Roles'), {
         'fields': ('is_voter', 'is_voted')}),
        (_('Dates'), {'fields': ('date_submitted', 'date_edited')}),
    )

    radio_fields = {'gender': admin.HORIZONTAL}

    def response_change(self, request, obj):
        if "_generate-id" in request.POST:
            if obj.public_key:
                messages.error(
                    request, f'Public key for {obj.get_full_name} \
                         is already exists.')
                return HttpResponseRedirect('.')

            try:
                account = create_account()
                obj.public_key = account.address
                obj.save()
                self.message_user(
                    request, f'Public key for {obj.get_full_name} is {account.address}')

                # ID generation
                citizen = {
                    'citizenship_number': obj.user.citizenship_number,
                    'id': obj.id,
                    'email': obj.user.email,
                    'first_name': obj.first_name,
                    'last_name': obj.last_name,
                    'dob': obj.dob,
                    'address': f'{obj.tole}-{obj.ward}, {obj.district}',
                    'private_key': account.privateKey.hex()
                }

                id = ID(**citizen)

                card = id.get_card()

                obj.id_card.save('jpg', content=image_content(card))

                self.message_user(
                    request, 'GENERATED')

                return HttpResponseRedirect('.')
            except:
                messages.error(request, "Oops, Error has encountered!")
                return HttpResponseRedirect('.')

        if "_send-id" in request.POST:
            try:
                _img_str = base64_encode(obj.id_card.open().read())
                id_generated.delay(obj.id, _img_str)
            except ValueError:
                messages.error(request, "Oops! ID card doesn't exist.")
                return HttpResponseRedirect('.')
            except FileNotFoundError:
                messages.error(request, 'Oops! File not found.')
                return HttpResponseRedirect('.')
            self.message_user(request, 'Email is sent Successfully.')
            return HttpResponseRedirect('.')

        if "_add-to-eth-net" in request.POST:
            manager = Manager()
            receipt = manager.add_voter(obj.public_key)
            tx_hash = receipt['transactionHash'].hex()
            url = f'https://rinkeby.etherscan.io/tx/{tx_hash}'
            if receipt['status']:
                self.message_user(
                    request, mark_safe(f'You successfully added this voter to eth-net.\
                        Please, navigate to <a href={url}>{url}</a> for further information.'))
                obj.is_voter = True
                obj.save()
                return HttpResponseRedirect('.')
            else:
                messages.error(request, mark_safe(f'Oops! your transaction is failed.\
                    Please navigate to <a href={url}>{url}</a> for further information.'))
                return HttpResponseRedirect('.')

        return super().response_change(request, obj)


class PartyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    readonly_fields = ('vote_count',)
    fieldsets = (
        (None, {'fields': ('name', 'description', 'slogan', 'logo')}),
        (_('Election Info'), {
         'fields': ('manifesto', 'plans')}),
        (_('Vote'), {
         'fields': ('vote_count',)}),
    )


class CandidateAdmin(admin.ModelAdmin):
    change_form_template = "admin/candidates/change_form.html"
    list_display = ('id', 'full_name')
    list_filter = ('is_candidate',)
    fieldsets = (
        (_('Personal Info'), {'fields': ('profile', 'party', 'bio', 'plans')}),
        (_('Role'), {
         'fields': ('is_candidate',)}),
        (_('Vote'), {
         'fields': ('vote_count',)}),
    )
    readonly_fields = ('is_candidate', 'vote_count',)

    def full_name(self, obj):
        return f'{obj.profile.get_full_name}'

    def response_change(self, request, obj):
        if "_add-to-eth-net" in request.POST:
            manager = Manager()
            receipt = manager.add_candidate(obj.profile.public_key)
            tx_hash = receipt['transactionHash'].hex()
            url = f'https://rinkeby.etherscan.io/tx/{tx_hash}'
            if receipt['status']:
                self.message_user(
                    request, mark_safe(f'You successfully added this candidate to eth-net.\
                        Please, navigate to <a href={url}>{url}</a> for further information.'))
                obj.is_candidate = True
                obj.save()
                return HttpResponseRedirect('.')
            else:
                messages.error(request, mark_safe(f'Oops! your transaction is failed.\
                    Please navigate to <a href={url}>{url}</a> for further information'))
                return HttpResponseRedirect('.')
        return super().response_change(request, obj)


admin.site.register(User, UserAdmin)
admin.site.register(FaceImage, FaceImageAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Party, PartyAdmin)
admin.site.register(Candidate, CandidateAdmin)
