const mongoose = require('mongoose');

const discoverList = require('./discoverList');

function modelController() {
  const User = mongoose.model('User');
  let crudMethods = {
    discoverList: (req, res) => discoverList(User, req, res),
  };
  return crudMethods;
}

module.exports = modelController();
