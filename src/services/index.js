const zignaly = require('./zignaly/zignaly.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(zignaly);
};
