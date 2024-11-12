# Rocketseat_NestJS_studies

Repository with notes from Rocketseat classes regarding NestJS

## NestJS:

  - Framework opnado, ou seja, existem muitos mais receitas para fazer as coisas;
  - Semelhante ao Django no Python;
  - Perde menos tempo pensando nas decisões técnicas

## Instalando e iniciando um projeto NestJS

- Execute no terminal **_npm i -g @nestjs/cli_** para baixar o NestJS (a parte do global é para facilitar o uso de comandos no terminal);
- Execute no terminal _**nest new project-name**_ para criar um novo projeto NestJS;
- Foi utilizado o **_pnpm_** pois ele lida melhor com a memória cache (Recomendação do Diego);
- Lembrete, para utilizar o **_pnpm_** é necessário executar antes **_npm install -g pnpm_**;
- Muitos arquivos gerados podem ser deletados, de maneira geral, a pasta pode ficar da seguinte maneira após ser executado o comando de inicialização:
  ```
  📦Project-Folder
  ┣ 📦src
  ┃  ┣ 📜app.controller.ts
  ┃  ┣ 📜app.module.ts
  ┃  ┣ 📜app.service.ts
  ┃  ┗ 📜main.ts
  ┣ 📦test
  ┣ 📜next-cli.json
  ┣ 📜package.json
  ┣ 📜pnpm-lock.yaml
  ┣ 📜tsconfig.build.sjon
  ┗ 📜tsconfig.json
  ```
- _pnpm i @nestjs/config_, para realizar as configurações da variáveis de ambiente:
- Arquivo [env.ts](./src/env.ts)

  ```JS
  // Aplicando configuração no arquivo .module
  // Essa configuração só funcionará se tiver com o arquivo "env.ts" já criado
  [ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // Para as variáveis de ambiente serem acessadas por todos os módulos
    })]
  ```
  ```JS
  // Aplicando configuração no arquivo main
  // Essa configuração só funcionará se tiver com o arquivo "env.ts" já criado
    const configService = app.get<ConfigService<Env, true>>(ConfigService)
    const port = configService.get('PORT', { infer: true })
    await app.listen(port);
  ```



- Modelo base, recomendado, para o [package.json](package.json)

  ```json
  // Lembrando que os valores para as versões não necessáriamente precisam ser os mesmos, além disso, esse modelo não precisa ser seguido fielmente, é apenas uma recomendação

  {
    "name": "nestjs-test-project",
    "version": "0.0.1",
    "description": "",
    "author": "",
    "private": true,
    "license": "UNLICENSED",
    "scripts": {
      "build": "nest build",
      "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
      "start": "nest start",
      "start:dev": "nest start --watch",
      "start:debug": "nest start --debug --watch",
      "start:prod": "node dist/main",
      "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    },
    "dependencies": {
      "@nestjs/common": "^10.0.0",
      "@nestjs/core": "^10.0.0",
      "@nestjs/platform-express": "^10.0.0",
      "reflect-metadata": "^0.2.0",
      "rxjs": "^7.8.1"
    },
    "devDependencies": {
      "@nestjs/cli": "^10.0.0",
      "@nestjs/schematics": "^10.0.0",
      "@nestjs/testing": "^10.0.0",
      "@types/express": "^5.0.0",
      "@types/node": "^20.3.1",
      "source-map-support": "^0.5.21",
      "ts-node": "^10.9.1",
      "tsconfig-paths": "^4.2.0",
      "typescript": "^5.1.3"
    }
  }
  ```

## Estrutura básica do Nest

- Possui uma forte opnião sobre os tipos de arquivos que vamos fazer na aplicação;
  - Controller → Porta de entrada via http da aplicação; - No nest, os controllers são decorados com _@Controller()_; - No caso, cada método da classe que recebeu o decorador _@Controller()_ será uma rota;
  - App.Module → "Raiz" do projeto;
    - Reune tudo num lugar só;
    - Geralmente é uma classe vazia com um decorador _@module()_;
    - As entradas do decorador são:
      - Controllers: Quais controllers existem dentro desse módulo (tudo que recebe requisição http);
      - providers: Quais as dependências dos controllers (basicamente é tudo que não é controller);
    - Para que seja possível passar um _provider_, a classe que é passada precisa, obrigatoriamente, ter um decorador _@injectable()_;
---
## Docker

- Download do [Docker-Desktop](https://desktop.docker.com/win/main/arm64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*qn6m94*_gcl_au*NzY5OTQxNTk1LjE3MzEwNzU1NTY.*_ga*MTY0Njg4OTY5MS4xNzI5NjE4NDMx*_ga_XJWPQMJYHQ*MTczMTA3NDIxMS4zLjEuMTczMTA3NTU1Ny41OS4wLjA.)
- Download da imagem [Postgres]() para o docker
- Docker não funcionou de primeira e tentei tudo isso aqui até resolver:
  ```ps1
  wsl --install
  ```
  ```ps1
  wsl --list --online
  ```
  ```ps1
  wsl --install -d Ubuntu-FOUNDED_VERSION
  ```
  ```ps1
  bcedit /set hypervisorlaunchtype auto
  ```
  - Desmarcar a opção de WSL que está presente na hora de instalação do Docker Desktop
  - BIOS -> Set "Enable" a opção de virtualização (depende do modelo da BIOS)

#### Exemplo do docker-compose.yml

```yml
version: "123.45"

services:
  postgres:
    container_name: nome-do-container
    image: nome-da-imagem
    ports: -5432:5432
    environment:
      POSTGRES_USER: postgres_user
      POSTGRES_PASSWORD: postgres_user_password
      POSTGRES_DB: bd_name
      PGDATA: /path/to/bd/folder
    volumes:
      - ./data/pg:/path/to/bd/folder
```

  - Se der erro, deleta a parte do volume, tentei um monte de coisa que achei no git e com o GPT, mas sempre caia num erro de permissão da pasta, e como Diego falou que não é tão necessário assim para desenvolvimento, eu só deixei sem.

###### Docker comands

- Start:

```ps1
docker-compose up -d
```

- End:

```ps1
docker-compose down -v
```

- Check:

```ps1
docker ps -a
```

- Infos:

```ps1
docker logs container_name
```
---
## Prisma

###### Start

    pnpm i prisma -D
    pnpm i @prisma/client
    pnpm prisma init

###### Commum Commands

    pnpm prisma migrate dev
    pnpm prisma studio
---
## BCripytJS

###### Commum Commands

    pnpm i bcryptjs
    pnpm i @types/bcryptjs -D
    hash(stringToHash, numberOfInteractions)
---

## AuthModule

- Bibliotecas necessárias:
  ```ps1
  pnpm i @nestjs/passport @nestjs/jwt
  ```
- JWT -> JSON Web Token

- Algorítmo RS256
  - O _secret_ será composto por duas chaves, uma pública e uma privada;
  - A chave privada é utilizada para criação e validação de tokens e fica armazenada **apenas** no serviço que cria novas autentificações;
  - A chave pública pode está em todos so serviços que precisam validar os tokens, porém não serve para criar novas autentificações;