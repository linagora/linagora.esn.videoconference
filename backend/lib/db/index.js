module.exports = dependencies => {
  const fs = require('fs');

  const models = {};

  fs.readdirSync(__dirname + '/models').forEach(filename => {
    const stat = fs.statSync(__dirname + '/models/' + filename);

    if (!stat.isFile()) { return; }
    models[filename.replace('.js', '')] = require('./models/' + filename)(dependencies);
  });

  return {models};
};
