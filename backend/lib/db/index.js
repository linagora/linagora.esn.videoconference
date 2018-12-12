const fs = require('fs');
const path = require('path');
const models = {};

module.exports = dependencies => {
  fs.readdirSync(__dirname + '/models').forEach(filename => {
    const modelPath = path.join(__dirname, 'models', filename);
    const modelName = filename.replace('.js', '');
    const stat = fs.statSync(modelPath);

    if (!stat.isFile() || models[modelName] !== undefined) { return; }
    models[modelName] = require('./models/' + filename)(dependencies);
  });

  return {models};
};
