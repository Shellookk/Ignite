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