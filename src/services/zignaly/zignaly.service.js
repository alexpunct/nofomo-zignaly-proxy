// Initializes the `zignaly` service on path `/zignaly`
const { Zignaly } = require('./zignaly.class');
const hooks = require('./zignaly.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/zignaly', new Zignaly(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('zignaly');

  service.hooks(hooks);
};
