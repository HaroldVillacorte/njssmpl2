var mongoose = require('mongoose');
var connectionString = 'mongodb://root:root@127.0.0.1:27017';

mongoose.connect(connectionString);

module.exports = mongoose.connection;