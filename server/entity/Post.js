const typeorm = require('typeorm');

module.exports = new typeorm.EntitySchema({
  tableName: 'posts',
  name: 'Post',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    link: {
      type: 'varchar',
    },
    contents: {
      type: 'text',
    },
  },
});
