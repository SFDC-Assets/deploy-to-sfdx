require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/server/migrations'
    }
  },

  testing: {
    client: 'pg',
    // eslint-disable-next-line no-undef
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/server/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: { 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './src/server/migrations'
    }
  }
};