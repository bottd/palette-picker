// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettes',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
