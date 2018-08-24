const fs = require('fs');
const express = require('express');
const next = require('next');
const typeorm = require('typeorm');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const routes = require('./routes');

app.prepare().then(async () => {
  const server = express();

  await typeorm.createConnection(require('../ormconfig'));

  routes.forEach(route => {
    server.get(`/api/${route.path}`, async (req, res) => {
      const [controllerClassName, action] = route.action.split('.');
      const controllerClass = require(`./controllers/${controllerClassName}`);
      const controller = new controllerClass();

      if (!controller[action]) {
        res.status(404).send();

        return;
      }

      try {
        const data = await controller[action](req);

        res.json(data);
      } catch (e) {
        console.log(e);

        res.status(500).send();
      }
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
