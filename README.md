<img src="meta/logo_icon_verzel_white.svg" width="150" align="right" />

# See Movies - Teste técnico Verzel

<p align="center">
  <a href="#tecnologias-utilizadas">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" /> 
 <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000" alt="License!" />

</p>

 Aplicação de Lista de Filmes que permita ao usuário pesquisar e salvar filmes em listas de favoritos. A aplicação se integra com a [API do The Movie Database](https://developer.themoviedb.org/docs/authentication-application) (TMDb) para exibir detalhes como a nota (rating) dos filmes.

 Este projeto é uma aplicação fullstack que utiliza FastAPI (Python) no backend, Next.js(React) no frontend, e um banco de dados PostgreSQL. Todo o ambiente está containerizado utilizando Docker e gerenciado via docker-compose.

## Assista o Preview do Projeto
[![Watch the video](https://img.youtube.com/vi/TRJj9oaa0rw/maxresdefault.jpg)](https://youtu.be/TRJj9oaa0rw)
## Features

- **Visualização de Filmes em Alta**: Descubra e explore filmes populares e com alta classificação.
- **Pesquisa de Filmes**: Busque filmes pelo título, facilitando a localização de seus filmes favoritos.
- **Detalhes de Filmes**: Acesse informações detalhadas sobre cada filme, incluindo sinopse, elenco, e muito mais.
- **Criação de Listas de Favoritos**: Crie diversas listas de favoritos públicas para organizar seus filmes preferidos, que são armazenadas no banco de dados.
- **Gerenciamento de Favoritos**: Adicione ou remova filmes de uma lista de favoritos específica, personalizando sua experiência.
- **Compartilhamento de Links**: Compartilhe facilmente links de listas favoritas e filmes com outras pessoas.
- **Scroll Infinito**: Navegação contínua e fluida pela lista de filmes, sem necessidade de recarregamento de página.
- **Responsividade**: Interface adaptável para dispositivos móveis, tablets e desktops, proporcionando uma experiência de usuário consistente.
- **Documentação Completa da API**: Acesse a documentação Swagger para visualizar e testar os endpoints da API em `/docs`, ou utilize a documentação ReDoc em `/redoc`.
- **Endpoints Abrangentes**: Mais de 10 endpoints disponíveis para interagir com a API.
- **Conexão com a API TMDB**: Integração direta com a API do TMDB para obter informações atualizadas sobre filmes.
- **Testes Unitários**: O backend possui 19 testes unitários, garantindo a qualidade e a estabilidade do código.




## Tecnologias Utilizadas
- **Backend:** FastAPI (Python)
- **Frontend:** Next.js 14 (React)
- **Banco de Dados:** PostgreSQL 14
- **Gerenciador de Pacotes Backend:** Poetry
- **Gerenciador de Pacotes Frontend:** npm
- **Containerização:** Docker e Docker Compose

## Pré Requisitos
Antes de iniciar, você precisa ter instalado em seu sistema:
- Docker
- Docker Compose
- [Token de API do TMDB](https://developer.themoviedb.org/docs/getting-started)

## Estrutura do Projeto

    ```bash
        see-movies
        ├── backend
        │   ├── app
        │   │   ├── api
        │   │   │   └── routes
        │   │   ├── core
        │   │   └── services
        │   ├── Dockerfile
        │   ├── poetry.lock
        │   ├── poetry.toml
        │   ├── pyproject.toml
        │   ├── README.md
        │   └── tests
        │       └── api
        │           └── routes
        ├── frontend
        │   ├── public
        │   │   ├── default-poster.png
        │   │   ├── favicon.ico
        │   │   └── logo.svg
        |   ├── Dockerfile
        │   ├── jsconfig.json
        │   ├── next.config.mjs
        │   ├── package.json
        │   ├── .env.local 
        │   ├── package-lock.json
        │   ├── postcss.config.mjs
        │   ├── README.md
        │   └── src
        │       └── app
        │           ├── favorites
        │           │   └── [id]
        │           │       └── details
        │           ├── lib
        │           ├── (movies)
        │           │   └── [id]
        │           │       └── details
        │           └── ui
        │               ├── favorites
        │               ├── globals.css
        │               ├── layouts
        │               └── movies

        ├── docker-compose.yml
        ├── .env < -------------------- Configurações do projeto
        ├── LICENSE
        └── README.md
    ```
## Configuração

### Backend
1. **Instalação de Dependências:** As dependências do backend são gerenciadas pelo Poetry. O Dockerfile no backend cuidará da instalação das dependências automaticamente.

2. **Configuração do Banco de Dados:** As configurações do banco de dados estão definidas no arquivo .env que será lido pelo FastAPI.

3. **Dockerfile do Backend:** O Dockerfile do backend realiza as seguintes etapas:
    - Define a imagem base como `python:3.12-sli`.
    - Instala o Poetry.
    - Copia os arquivos do projeto para o container.
    - Instala as dependências usando Poetry.
    - Define o comando padrão para iniciar a aplicação.

### Frontend
1. **Instalação de Dependências:** As dependências do frontend são gerenciadas pelo npm. O Dockerfile no frontend cuidará da instalação das dependências automaticamente.

2. **Dockerfile do Frontend:** O Dockerfile do frontend realiza as seguintes etapas:
    - Define a imagem base como `node:18-alpine`.
    - Define o diretório de trabalho.
    - Copia os arquivos do projeto para o container.
    - Instala as dependências com npm.
    - Define o comando padrão para iniciar o servidor Next.js.

## Executando o Projeto
1. Clone o repositório:
    ```bash
    git clone https://github.com/VicktorMS/see-movies.git
    cd see-movies
    ```
2. Adicione suas credenciais da API do TMDB no arquivo `.env` na pasta raiz do projeto.
    ```bash
    TMDB_API_KEY=sua_chave
    TMDB_API_BEARER_TOKEN=seu_token
    ```

3. Em seguida configure as variáveis de ambiente restantes ajuste conforme necessário, __caso tenha intenção de o projeto funcione apenas localmente mantenha as configurações__:
    ```bash
    PROJECT_NAME="See Movie"
    PROJECT_VERSION="1.0.0"

    # Configurações Postgres
    POSTGRES_SERVER=db
    POSTGRES_PORT=5432
    POSTGRES_DB=see_movie
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres

    #Configurações da API TMDB 
    ...

    # Configuração de CORS, deixar em branco caso esteja em ambiente local
    BACKEND_CORS_ORIGINS=

    ```
4. Inicie os containers:

    ```bash
    docker-compose up --build
    ```
    Isso irá construir e iniciar todos os serviços definidos no `docker-compose.yml`.

5. Acesse a aplicação:
    - Backend: http://localhost:8000
    - Frontend: http://localhost:3000

## Licença
Este projeto está licenciado sob a [MIT License](./LICENSE). Veja o arquivo `LICENSE` para mais detalhes.
