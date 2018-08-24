module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'next',
  entities: [`${__dirname}/server/entity/**/*.js`],
};
