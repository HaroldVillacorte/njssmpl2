var FlightSchema = require('../schemas/flight');

module.exports = function(flights) {
    var flight = require('../modules/flight');

    for (var number in flights) {
        flights[number] = flight(flights[number]);
    }

    var functions = {};

    functions.flight = function(req, res) {
        var number = req.param('number');

        req.session.lastNumber = number;

        if (typeof flights[number] === 'undefined') {
            res.status(404).json({status: 404});
        }
        else {
            res.json(flights[number].getInformation());
        }
    };

    functions.arrived = function(req, res) {
        var number = req.param('number');

        if (typeof flights[number] === 'undefined') {
            res.status(404).json({status: 404});
        }
        else {
            flights[number].triggerArrive();

            // Save to mongo
            var record = new FlightSchema(flights[number].getInformation());
            record.save(function(error) {
                if (error) {
                    console.log(error);
                    reponse.status(500).json({status: 'failure'});
                }
                else {
                    res.json({status: 'done'});
                }
            });
        }
    };

    // Query Mongo
    functions.arrivals = function(request, response) {
        FlightSchema.find().setOptions({
            sort: 'actualArrive'
        }).exec(function(error, arrivals) {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'faliue'});
            }
            else {
                response.render('arrivals', {
                    title: 'Arrivals',
                    arrivals: arrivals,
                    lastNumber: request.session.lastNumber
                });
            }
        });
    };

    functions.list = function(req, res) {
        res.render('list.ejs', {title: 'All flights', flights: flights});
    };

    functions.login = function(req, res) {
        res.render('login.ejs', {title: 'Login'});
    };

    functions.user = function(req, res) {
        if (req.session.passport.user === undefined) {
            res.redirect('/login');
        }
        else {
            res.render('user.ejs', {
                title: 'Welcome',
                user: req.user
            });
        }
    };

    return functions;
};


