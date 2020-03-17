require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
