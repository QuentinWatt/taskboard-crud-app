module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  // Add the defaultUser property to the Cypress configuration
  config.env.defaultUser = {
    email: 'user@taskmaster.test',
    password: 'password'
  };

  // Return the modified configuration
  return config;
};