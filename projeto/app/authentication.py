from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings


class CookieJWTAuthentication(JWTAuthentication):
    """
    Lê o JWT do cookie, não do header Authorization.
    """

    def authenticate(self, request):
        token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        if not token:
            return None

        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token
