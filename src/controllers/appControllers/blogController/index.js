const mongoose = require('mongoose');
const remove = require('./remove');
const create = require('./create');
const read = require('./read');
const update = require('./update');
const paginatedList = require('./paginatedList');

function modelController() {
  const Model = mongoose.model('Blog');
  let crudMethods = {
    create: (req, res) => create(Model, req, res),
    read: (req, res) => read(Model, req, res),
    update: (req, res) => update(Model, req, res),
    delete: (req, res) => remove(Model, req, res),
    list: (req, res) => paginatedList(Model, req, res)
  };
  return crudMethods;
}

module.exports = modelController();
