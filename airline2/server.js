var http = require('http');
var db = require('./mongo');
var flights = require('./modules/data');
var app = require('./modules/app')(flights, db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
