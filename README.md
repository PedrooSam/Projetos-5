# Projetos-5
Este projeto consiste em uma API de um sistema de venda e divulgação de peças de teatro na cidade do Recife. A aplicação visa contralizar e facilitar o acesso a cultura e entretenimento, permitindo uma maior divulgação das peças e maior facilicade para compra de ingressos.

## Como rodar?
Para rodar o projeto é necessário inicialmente criar e ativar um ambiente virtual python.
```
py -m venv venv
```
```
venv/scripts/activate
```
Depois, é necessário instalar as dependências do projeto.
```
pip install -r requirements.txt
```
Entre na pasta raiz do projeto.
```
cd projeto
```
Faça as migrações para gerar o banco de dados.
```
py manage.py makemigrations
```
```
py manage.py migrate
```
Finalmente, inicie a API.
```
py manage.py runserver
```
## Importante:
O projeto possui uma documentação swagger, mapeada pela extensão do django chamada drf-spectacular.</br>
Para acessá-la, basta acessar a url "/docs" ao rodar o projeto.
