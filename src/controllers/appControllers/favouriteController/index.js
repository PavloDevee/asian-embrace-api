const mongoose = require('mongoose');

const create = require('./create');
const paginatedList = require('./paginatedList');

function modelController() {
  const Model = mongoose.model('Favourite');
  let crudMethods = {
    create: (req, res) => create(Model, req, res),
    list: (req, res) => paginatedList(Model, req, res),
  };
  return crudMethods;
}

module.exports = modelController();
