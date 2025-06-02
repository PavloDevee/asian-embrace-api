const mongoose = require('mongoose');

const create = require('./create');
const read = require('./read');
const remove = require('./remove');

function modelController() {
  const Model = mongoose.model('UserSubscription');
  let crudMethods = {
    create: (req, res) => create(Model, req, res),
    read: (req, res) => read(Model, req, res),
    remove: (req, res) => remove(Model, req, res)
  };
  return crudMethods;
}

module.exports = modelController();
