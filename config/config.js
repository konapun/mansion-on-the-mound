var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tmp'
    },
    port: 3000,
    db: 'mongodb://localhost/tmp-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tmp'
    },
    port: 3000,
    db: 'mongodb://localhost/tmp-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tmp'
    },
    port: 3000,
    db: 'mongodb://localhost/tmp-production'
  }
};

module.exports = config[env];
