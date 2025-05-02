const mongoose = require('mongoose');

const create = require('./create');
const paginatedList = require('./paginatedList');
const blockedUserList = require('./blockedUserList');

function modelController() {
  const Model = mongoose.model('Block');
  let crudMethods = {
    create: (req, res) => create(Model, req, res),
    list: (req, res) => paginatedList(Model, req, res),
    blockedUserList: (req, res) => blockedUserList(Model, req, res),
  };
  return crudMethods;
}

module.exports = modelController();
