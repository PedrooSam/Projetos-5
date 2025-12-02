from django.db import models
from django.utils import timezone


# Create your models here.

class Endereco(models.Model):
    numero = models.CharField(max_length=5)
    rua = models.CharField(max_length=100)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)

class Teatro(models.Model):
    nome = models.CharField(max_length=100)
    endereco = models.OneToOneField(Endereco, on_delete=models.CASCADE, related_name="teatro")

class ClassificacaoEspetaculo(models.TextChoices):
    CLASSIFICACAO_LIVRE = ("Livre")
    CLASSIFICACAO_10 = ("+10")
    CLASSIFICACAO_12 = ("+12")
    CLASSIFICACAO_14 = ("+14")
    CLASSIFICACAO_16 = ("+16")
    CLASSIFICACAO_18 = ("+18")

class CategoriaEspetaculo(models.TextChoices):
    comedia = ("Comédia")
    drama = ("Drama")
    musical = ("Musical")
    danca = ("Dança")
    tragedia = ("Tragédia")

class Espetaculo(models.Model):
    nome = models.CharField(max_length=100)
    grupo = models.CharField(max_length=100)
    descricao = models.TextField()
    duracao = models.IntegerField()
    classificacao = models.CharField(max_length=5, choices=ClassificacaoEspetaculo.choices)
    categoria = models.CharField(max_length=8, choices=CategoriaEspetaculo.choices)

    
class Sessao(models.Model):
    teatro = models.ForeignKey(Teatro, on_delete=models.PROTECT, related_name="sessoes")
    espetaculo = models.ForeignKey(Espetaculo, on_delete=models.PROTECT, related_name="sessoes")
    preco = models.DecimalField(decimal_places=2, max_digits=6)
    data = models.DateField(default=timezone.now)
