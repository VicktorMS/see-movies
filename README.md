<img src="meta/logo_icon_verzel_white.svg" width="150" align="right" />

# See Movies - Teste técnico Verzel

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" /> 
 <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000" alt="License!" />

</p>

 Aplicação de Lista de Filmes que permita ao usuário pesquisar e salvar filmes em listas de favoritos. A aplicação se integra com a [API do The Movie Database](https://developer.themoviedb.org/docs/authentication-application) (TMDb) para exibir detalhes como a nota (rating) dos filmes.

 Este projeto é uma aplicação fullstack que utiliza FastAPI (Python) no backend, Next.js(React) no frontend, e um banco de dados PostgreSQL. Todo o ambiente está containerizado utilizando Docker e gerenciado via docker-compose.

## Tecnologias Utilizadas
- **Backend:** FastAPI (Python 3.12)
- **Frontend:** Next.js 14 (React)
- **Banco de Dados:** PostgreSQL 14
- **Gerenciador de Pacotes Backend:** Poetry
- **Gerenciador de Pacotes Frontend:** npm
- **Containerização:** Docker e Docker Compose

## Pré Requisitos
Antes de iniciar, você precisa ter instalado em seu sistema:
- Docker
- Docker Compose

## Estrutura do Projeto
    ```
    .
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

## Testes Backend e DB
Para executar os testes, siga os passos abaixo:
1. Certifique-se de que o container do `backend` e `db` estão em execução.
2. Execute os testes com o comando:
    ```bash
    docker-compose exec backend poetry run pytest
    ```
## Licença
Este projeto está licenciado sob a [MIT License](./LICENSE). Veja o arquivo `LICENSE` para mais detalhes.