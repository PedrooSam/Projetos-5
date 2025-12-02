from drf_spectacular.extensions import OpenApiAuthenticationExtension

class CookieJWTAuthenticationExtension(OpenApiAuthenticationExtension):
    target_class = 'app.authentication.CookieJWTAuthentication'  # caminho da sua classe
    name = 'cookieJWT'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'apiKey',
            'in': 'cookie',
            'name': 'access_token',  # nome do cookie que contém o token
        }