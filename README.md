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

    ```
    npx knex -h 
    ```

- comando para criar a migrate:

    ```
    npx knex migrate:make nomeMigrate
    ```

- comando para rodar as migrations:
    
    ```
    npm run knex --migrate:latest
    ```

- comando para rollback:

    ```
    npm run knex --migrate:rollback
    ```
3. Criando tabela de transações:
- Todo arquivo de migrations terão sempre dois metodos:
<ol>
<strong><li>up: cria as tabelas e itens</li></strong>
exemplo de uso do metodo up:

``` 
import { Knex } from 'knex'

export async function up(knex: Knex)Promise<void>{
    await knex.schema.createTable('transactions', (table) =>{
        table.uuid('id').primary()
        table.text('title').notNullable()
    })
}
```
<strong><li>down: remove as tabelas e itens</li></strong>
exemplo de uso do metodo down:

``` 
import { Knex } from 'knex'

export async function up(knex: Knex)Promise<void>{
    await knex.schema.createTable('transactions', (table) =>{
        table.uuid('id').primary()
        table.text('title').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}
```

<strong><li>Exemplo completo de uma criação de uma migrate: </li></strong>

```
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
```

<strong><li>Exemplo completo de uma criação de uma migrate de alteração: </li></strong>

```
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index()
  })
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}
```

</ol>