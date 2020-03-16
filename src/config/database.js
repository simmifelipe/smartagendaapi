module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5430',
  username: 'postgres',
  password: 'docker',
  database: 'smartagenda',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};