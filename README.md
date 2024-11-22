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
  ```ps1
  pnpm i passport-jwt
  ```
  ```ps1
  pnpm i @types/passport-jwt
  ```
- JWT -> JSON Web Token

- Algorítmo RS256
  - O _secret_ será composto por duas chaves, uma pública e uma privada;
  - A chave privada é utilizada para criação e validação de tokens e fica armazenada **apenas** no serviço que cria novas autentificações;
  - A chave pública pode está em todos so serviços que precisam validar os tokens, porém não serve para criar novas autentificações;
  - Para gerar as chaves existem diversos métodos, porém o mais rápido provavelmente é entrar num site e gerar;
  - As chaves geradas estarão em formato de string, e muito provavelmente terá quebra de linhas, então tem que mudar para base64 para colocar no arquivo .env

- Os arquivos da pasta [auth](./src/auth/)
  - Eles são fixos, digo no sentido de que provavelmente não terão mudanças, são linhas de códigos feita por meio da documentação do NestJS, então creio que se por lá não alterar, muito provavelmente esse código também não será alterado;
---
## Configurando o Vitest

- Comandos iniciais:

```ps1
pnpm i vitest unplugin-swc @swc/core @vitest/coverage-v8 -D
```
```ps1
pnpm i vite-tsconfig-paths -D
```
```ps1
pnpm i supertest -D
```
```ps1
pnpm i @types/supertest -D
```

- Arquivo [vitest.config.ts](./vitest.config.ts) (padrão do NestJS)

- Ajustando os scripts de teste no package.json:


```json
{
  "type": "module",

}
// ...
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:cov": "vitest run --coverage",
    "test:debug": "vitest --inspect-brk --inspect --logHeapUsage --threads=false",
    "test:e2e": "vitest run --config ./vitest.config.e2e.ts"
  }
}
```

- [setup-e2e.ts](./test/setup-e2e.ts)
  - Basicamente é um arquivo que garante que o banco de dados seja um ambiente isolado para os testes;
---
## Copiando os arquivos de um Dominínio

- Baixar as dependências da camada de domínio;
  - Dica, usando o código abaixo é possível fazer uma "verificação" geral de forma rápida:
  ```ps1
  pnpm tsc --noEmit
  ```
- Caso surja um erro com o _SpyInstance_, que é utilizado pelo Diego, ocorre que nas novas verções do Vitest, o _SpyInstance_ foi substituido por _MockInstance_, os demais problemas de TypeScript foram resolvidos jogando no GPT;

## Mappers:

- Os mappers são responsáveis por converter uma entidade de um formato para outro, permitindo que diferentes camadas da aplicação trabalhem com representações diferentes da mesma entidade

### Ideia geral da nova organização de pastas:

📦src
 ┣ 📂core
 ┃ ┣ 📂entities // Contratos base para as entidades
 ┃ ┃ ┣ 📜aggregate-root.ts
 ┃ ┃ ┣ 📜entity.ts
 ┃ ┃ ┣ 📜unique-entity-id.ts
 ┃ ┃ ┣ 📜watched-list.spec.ts
 ┃ ┃ ┗ 📜watched-list.ts
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📂errors // Erros definidos para a aplicação
 ┃ ┃ ┃ ┣ 📜not-allowed-error.ts
 ┃ ┃ ┃ ┗ 📜resource-not-found-error.ts
 ┃ ┃ ┗ 📜use-case-error.ts
 ┃ ┣ 📂events // Eventos de domínio (Aula de notiicações)
 ┃ ┃ ┣ 📜domain-event.ts
 ┃ ┃ ┣ 📜domain-events.spec.ts
 ┃ ┃ ┣ 📜domain-events.ts
 ┃ ┃ ┗ 📜event-handler.ts
 ┃ ┣ 📂repositories
 ┃ ┃ ┗ 📜pagination-params.ts
 ┃ ┣ 📂types // Só copia
 ┃ ┃ ┗ 📜optional.ts
 ┃ ┣ 📜either.spec.ts
 ┃ ┗ 📜either.ts // Só copia
 ┣ 📂domain // Pasta onde ficam os domínio
 ┃ ┣ 📂Example-Domain
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┃ ┗ 📜example-repository.ts
 ┃ ┃ ┃ ┗ 📂use-cases
 ┃ ┃ ┃ ┃ ┗ 📜example-use-case.ts
 ┃ ┃ ┗ 📂enterprise
 ┃ ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┃ ┣ 📂value-objects // Informações de uma entidade que são objetos e possuem algum tipo de validação ou operação
 ┃ ┃ ┃ ┃ ┃ ┗ 📜example-value-object.ts
 ┃ ┃ ┃ ┃ ┗ 📜example-entity.ts
 ┃ ┃ ┃ ┗ 📂events
 ┃ ┃ ┃ ┃ ┗ 📜example-event-from-this-domain.ts
 ┃ ┗ 📂notification // Vai ter em praticamente toda aplicação
 ┃ ┃ ┣ 📂application
 ┃ ┃ ┃ ┣ 📂repositories
 ┃ ┃ ┃ ┃ ┗ 📜notifications-repository.ts
 ┃ ┃ ┃ ┣ 📂subscribers // Basicamente são os acionadores de um determinado evento
 ┃ ┃ ┃ ┃ ┗ 📜example-on-event-trigger.ts
 ┃ ┃ ┃ ┗ 📂use-cases
 ┃ ┃ ┃ ┃ ┣ 📜read-notification.spec.ts
 ┃ ┃ ┃ ┃ ┣ 📜read-notification.ts
 ┃ ┃ ┃ ┃ ┣ 📜send-notification.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜send-notification.ts
 ┃ ┃ ┗ 📂enterprise
 ┃ ┃ ┃ ┗ 📂entities
 ┃ ┃ ┃ ┃ ┗ 📜notification.ts
 ┗ 📂infra
 ┃ ┣ 📂auth // Só copia, não tem muito o que entender aqui, é da documentação do NestJS
 ┃ ┃ ┣ 📜auth.module.ts
 ┃ ┃ ┣ 📜current-user-decorator.ts
 ┃ ┃ ┗ 📜jwt.strategy.ts
 ┃ ┣ 📂database // Coloca as paradas do banco de dados aqui
 ┃ ┃ ┣ 📂banco-de-dados-escolhido
 ┃ ┃ ┃ ┣ 📂mappers // Converte formato-entidade<=> formato-banco-de-dados
 ┃ ┃ ┃ ┃ ┗ 📜example-mapper.ts
 ┃ ┃ ┃ ┣ 📂repositories // repositórios do banco de dados
 ┃ ┃ ┃ ┃ ┗ 📜example-repository.ts
 ┃ ┃ ┃ ┗ 📜database.service.ts
 ┃ ┃ ┗ 📜database.module.ts
 ┃ ┣ 📂http
 ┃ ┃ ┣ 📂controllers // Controllers do Nest
 ┃ ┃ ┃ ┣ 📜authentificate.controller.e2e-spec.ts
 ┃ ┃ ┃ ┣ 📜authentificate.controller.ts
 ┃ ┃ ┃ ┣ 📜example.controller.e2e-spec.ts
 ┃ ┃ ┃ ┗ 📜example.controller.ts
 ┃ ┃ ┣ 📂pipes
 ┃ ┃ ┃ ┗ 📜zod-validation-pipe.ts // Veja [create-question.controller.ts](./src/infra/http/controllers/create-question.controller.ts) para exemplo do uso dessa validação
 ┃ ┃ ┗ 📜http.module.ts
 ┃ ┣ 📜app.module.ts
 ┃ ┣ 📜env.ts
 ┃ ┗ 📜main.ts

📦test
 ┣ 📂factories
 ┃ ┗ 📜factory-example.ts
 ┣ 📂repositories
 ┃ ┗ 📜example-test-repository.ts
 ┣ 📂utils
 ┃ ┗ 📜wait-for.ts // Só copia
 ┗ 📜setup-e2e.ts
 