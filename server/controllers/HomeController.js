const typeorm = require('typeorm');

module.exports = class HomeController {
  async index() {
    const connection = await typeorm.getConnection();

    return connection.getRepository('Post').find();
  }
};
