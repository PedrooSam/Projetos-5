from rest_framework import serializers
from .models import Endereco, Teatro, Espetaculo, Sessao

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = '__all__'


class TeatroSerializer(serializers.ModelSerializer):
    endereco = EnderecoSerializer(required=True)

    class Meta:
        model = Teatro
        fields = '__all__'

    def validate_endereco(self, value):
        """Impede a criação de teatro sem endereço."""
        if not value:
            raise serializers.ValidationError("O campo 'endereco' é obrigatório.")
        return value

    def create(self, validated_data):
        endereco_data = validated_data.pop('endereco')
        endereco = Endereco.objects.create(**endereco_data)
        teatro = Teatro.objects.create(endereco=endereco, **validated_data)
        return teatro

    def update(self, instance, validated_data):
        endereco_data = validated_data.pop('endereco', None)
        if endereco_data:
            for attr, value in endereco_data.items():
                setattr(instance.endereco, attr, value)
            instance.endereco.save()
        return super().update(instance, validated_data)


class EspetaculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espetaculo
        fields = '__all__'


class SessaoSerializer(serializers.ModelSerializer):
    teatro = serializers.StringRelatedField()
    espetaculo = serializers.StringRelatedField()

    class Meta:
        model = Sessao
        fields = '__all__'
