var app = require('../app.js');
var expect = require('chai').expect;
var request = require('supertest');

describe('LIFO end-points test', function() {
    it('should add Hello to stack', function(done) {
        request(app)
            .post('/stack')
            .set('Content-Type', 'application/json')
            .send({ key : 'Hello' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should add World to stack', function(done) {
        request(app)
            .post('/stack')
            .set('Content-Type', 'application/json')
            .send({ key : 'World' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should return World from stack', function(done) {
        request(app)
            .get('/stack')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.key).to.equal('World');
                // Done
                done();
            });
    });

    it('should add Again to stack', function(done) {
        request(app)
            .post('/stack')
            .set('Content-Type', 'application/json')
            .send({ key : 'Again' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should return Again from stack', function(done) {
        request(app)
            .get('/stack')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.key).to.equal('Again');
                // Done
                done();
            });
    });

    it('should return Hello from stack', function(done) {
        request(app)
            .get('/stack')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.key).to.equal('Hello');
                // Done
                done();
            });
    });
});

describe('key-store end-points test', function() {
    it('should set name to John', function(done) {
        request(app)
            .post('/store')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .send({ key: 'name', value: 'John' })
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should get name `John` from store', function(done) {
        request(app)
            .get('/store')
            .set('Content-Type', 'application/json')
            .send({ key: 'name' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.value).to.equal('John');
                // Done
                done();
            });
    });

    it('should get age from store', function(done) {
        request(app)
            .get('/store')
            .set('Content-Type', 'application/json')
            .send({ key: 'age' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.value).to.equal('');
                // Done
                done();
            });
    });

    it('should set name `Larry` with TTL=3 to store', function(done) {
        request(app)
            .post('/store')
            .set('Content-Type', 'application/json')
            .query({ TTL: 3 })
            .send({ key: 'name', value: 'Larry' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should get name `Larry` from store', function(done) {
        request(app)
            .get('/store')
            .set('Content-Type', 'application/json')
            .send({ key: 'name' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.value).to.equal('Larry');
                // Done
                done();
            });
    });

    it('should get name from store after 4 seconds', function(done) {
        setTimeout(() => {
            request(app)
                .get('/store')
                .set('Content-Type', 'application/json')
                .send({ key: 'name' })
                .expect('Content-Type', /json/)
                .expect(200, function(err, res) {
                    if (err) { return done(err); }
                    expect(res.body.success).to.equal(true);
                    expect(res.body.value).to.equal('');
                    // Done
                    done();
                });
        }, 4000);
    });

    it('should set name `Larry` with TTL=3 to store', function(done) {
        request(app)
            .post('/store')
            .set('Content-Type', 'application/json')
            .query({ TTL: 3 })
            .send({ key: 'name', value: 'Larry' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should delete entry with key=`name` from store', function(done) {
        request(app)
            .delete('/store')
            .set('Content-Type', 'application/json')
            .send({ key: 'name' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                // Done
                done();
            });
    });

    it('should get name from store', function(done) {
        request(app)
            .get('/store')
            .set('Content-Type', 'application/json')
            .send({ key: 'name' })
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) { return done(err); }
                expect(res.body.success).to.equal(true);
                expect(res.body.value).to.equal('');
                // Done
                done();
            });
    });
});