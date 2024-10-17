# Ignite
Repositório para a trilha Ignire da RocketSeat

# modulo 1
Sem observações

# modulo 2
1. Utilizando o knex e o sqlite3: 
    - Instalando o arquivo 
    ```
    npm install knex sqlite3

    ```
    - Configurando o banco de dados
    ```
        const knex = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
        filename: './mydb.sqlite',
    },    
    });
    ```
2. Migrations:
Migrations são controles de versão do banco de dados. Elas são uma linha do tempo do banco de  dados.
- comando de ajuda para o knex:
npx knex -h

Cria a migrate:
npx knex migrate:make 