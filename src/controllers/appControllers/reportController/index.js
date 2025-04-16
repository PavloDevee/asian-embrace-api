const mongoose = require('mongoose');

const create = require('./create');
const paginatedList = require('./paginatedList');
const update = require('./update');

function modelController() {
  const Model = mongoose.model('Report');
  let crudMethods = {
    create: (req, res) => create(Model, req, res),
    list: (req, res) => paginatedList(Model, req, res),
    update: (req, res) => update(Model, req, res),
  };
  return crudMethods;
}

module.exports = modelController();
