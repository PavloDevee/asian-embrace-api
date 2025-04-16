const mongoose = require('mongoose');

const paginatedList = require('./paginatedList');
const notificationCount = require('./notificationCount');
const readAll = require('./readAll');

function modelController() {
  const Model = mongoose.model('Notification');
  let crudMethods = {
    list: (req, res) => paginatedList(Model, req, res),
    notificationCount: (req, res) => notificationCount(Model, req, res),
    readAll: (req, res) => readAll(Model, req, res),
  };
  return crudMethods;
}

module.exports = modelController();
