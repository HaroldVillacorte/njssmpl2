var express = require('express');
var path = require('path');
var routes = require('../../routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(function(req, res, next) {
    res.set('X-Powered-By', 'Flight Tracker');
    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/list', routes.list);
app.get('/flight/:number', routes.flight);
app.put('/flight/:number/arrived', routes.arrived);

module.exports = app;