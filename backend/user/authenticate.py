from django.contrib.auth.backends import ModelBackend

import face_recognition
from core.models import User


class FaceIdAuthBackend(ModelBackend):
    def authenticate(self,
                     citizenship_number=None,
                     password=None,
                     face_id=None,
                     **kwargs):
        try:
            user = User.objects.get(citizenship_number=citizenship_number)
            if user.check_password(password) and self.check_face_id(
                face_id=user.faceimage.image,
                uploaded_face_id=face_id
            ):
                return user

        except User.DoesNotExist:
            User().set_password(password)

    def check_face_id(self, face_id=None, uploaded_face_id=None):
        """
        Returns True if uploaded_face matches with the database face
        """
        confirmed_image = face_recognition.load_image_file(face_id)
        uploaded_image = face_recognition.load_image_file(uploaded_face_id)

        face_locations = face_recognition.face_locations(uploaded_image)
        if len(face_locations) == 0:
            return False

        confirmed_encoding = face_recognition.face_encodings(confirmed_image)[
            0]
        unkown_encoding = face_recognition.face_encodings(uploaded_image)[0]

        results = face_recognition.compare_faces(
            [confirmed_encoding], unkown_encoding)

        if results[0]:
            return True

        return False
