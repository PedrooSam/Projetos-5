from rest_framework import viewsets
from .models import Teatro, Espetaculo, Sessao
from .serializers import EnderecoSerializer, TeatroSerializer, EspetaculoSerializer, SessaoSerializer

# Create your views here.

class TeatroViewSet(viewsets.ModelViewSet):
    queryset = Teatro.objects.select_related('endereco').all().order_by('nome')
    serializer_class = TeatroSerializer


class EspetaculoViewSet(viewsets.ModelViewSet):
    queryset = Espetaculo.objects.all().order_by('nome')
    serializer_class = EspetaculoSerializer


class SessaoViewSet(viewsets.ModelViewSet):
    queryset = Sessao.objects.select_related('teatro', 'espetaculo').all().order_by('teatro__nome')
    serializer_class = SessaoSerializer
