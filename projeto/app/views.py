from rest_framework import viewsets
from .models import Teatro, Espetaculo, Sessao
from .serializers import EnderecoSerializer, TeatroSerializer, EspetaculoSerializer, SessaoSerializer
from drf_spectacular.utils import extend_schema

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
