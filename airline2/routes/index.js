
/*
 * GET home page.
 */

var flights = require('../modules/data');
var flight = require('../modules/flight');

for (var number in flights) {
    flights[number] = flight(flights[number]);
}

exports.flight = function(req, res) {
    var number = req.param('number');

    if (typeof flights[number] === 'undefined') {
        res.status(404).json({status: 404});
    }
    else {
        res.json(flights[number].getInformation());
    }
};

exports.arrived = function(req, res) {
    var number = req.param('number');

    if (typeof flights[number] === 'undefined') {
        res.status(404).json({status: 404});
    }
    else {
        flights[number].triggerArrive();
        res.json({status: 'done'});
    }
};

exports.list = function(req, res) {
    res.render('list.ejs', {title: 'All flights', flights: flights});
};
