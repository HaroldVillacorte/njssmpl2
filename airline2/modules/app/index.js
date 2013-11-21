module.exports = function(flights, db) {
    var express = require('express');
    var MongoStore = require('connect-mongo')(express);
    var passport = require('../../auth');
    var path = require('path');
    var routes = require('../../routes')(flights);
    var app = express();

    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'secret_encrytion_key',
        store: new MongoStore({
            mongoose_connection: db
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.bodyParser());
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
    app.get('/arrivals', routes.arrivals);
    app.get('/login', routes.login);
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/user'
    }));
    app.get('/user', routes.user);

    return app;

};

