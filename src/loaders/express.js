const bodyParser = require('body-parser'),
      cors = require('cors');

const expressApp = (app => {
      app.use(cors());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
})

module.exports = expressApp;