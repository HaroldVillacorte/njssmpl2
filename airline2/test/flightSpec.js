var app = require('./helpers/app');
var should = require('should');
var supertest = require('supertest');

describe('flights', function() {

    it('should return valid flight data from flight 1', function(done) {
        supertest(app).get('/flight/1').expect(200).end(function(error, response) {
            response.status.should.equal(200);
            response.body.number.should.equal(1);
            done();
        });
    });

    it('should return an error for an invalid flght', function(done) {
        supertest(app).get('/flight/3').expect(404).end(function(error, response) {
            response.status.should.equal(404);
            done();
        });
    });

    it('should mark a flight as arrived', function(done) {
        supertest(app).put('/flight/1/arrived').expect(200).end(function(error, response) {
            response.status.should.equal(200);
            response.body.status.should.equal('done');
            done();
        });
    });

});
