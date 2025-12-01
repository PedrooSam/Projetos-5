from rest_framework import viewsets
from .models import Teatro, Espetaculo, Sessao
from .serializers import TeatroSerializer, EspetaculoSerializer, SessaoSerializer
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.

@extend_schema(
    tags=["Teatro"],
    summary="Gerenciar Teatros",
    description="Este endpoint permite criar, listar, atualizar e excluir teatros. Se refere aos ambientes em que os espetáculos ocorrem."
)
class TeatroViewSet(viewsets.ModelViewSet):
    queryset = Teatro.objects.select_related('endereco').all().order_by('nome')
    serializer_class = TeatroSerializer

@extend_schema(
    tags=["Espetáculo"],
    summary="Gerenciar Espetáculos",
    description="Este endpoint permite criar, listar, atualizar e excluir espetáculos. Se refere às peças que podem ocorrer nos teatros, é uma entidade mais genérica."
)
class EspetaculoViewSet(viewsets.ModelViewSet):
    queryset = Espetaculo.objects.all().order_by('nome')
    serializer_class = EspetaculoSerializer

@extend_schema(
    tags=["Sessão"],
    summary="Gerenciar Sessões",
    description="Este endpoint permite criar, listar, atualizar e excluir sessões. Se refere às apresentações propriamente ditas de um espetáculo, que ocorrem nos teatros."
)
class SessaoViewSet(viewsets.ModelViewSet):
    queryset = Sessao.objects.select_related('teatro', 'espetaculo').all().order_by('teatro__nome')
    serializer_class = SessaoSerializer


class CookieTokenObtainPairView(TokenObtainPairView):
    """
    Retorna os tokens no Cookie em vez de retornar no corpo da resposta.
    """
    print('aaaaaaaa')
    def post(self, request, *args, **kwargs):
        print(">>> COOKIE LOGIN VIEW CHAMADA <<<")
        response = super().post(request, *args, **kwargs)
        data = response.data

        access = data.get("access")
        refresh = data.get("refresh")

        # Limpando corpo da resposta (opcional)
        response.data = {"detail": "Login realizado com sucesso"}

        # Configurações comuns de cookie
        cookie_params = {
            "httponly": True,
            "secure": settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            "samesite": settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            "path": settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
        }

        # Set cookies
        response.set_cookie(
            settings.SIMPLE_JWT["AUTH_COOKIE"],
            access,
            **cookie_params
        )

        response.set_cookie(
            "refresh_token",
            refresh,
            **cookie_params
        )

        return response
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logout realizado"})

        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        response.delete_cookie("refresh_token")

        return response