/**
 * Created by blessonm on 1/10/2017.
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let faker = require('faker');
let User = require('./user.model');
let server = require('./../../server');
let post_id = null;

chai.use(chaiHttp);

describe("API Test", () => {

    // Before all test cases
    before((done) => {
        User.remove({}, (err) => {
            done();
    });
    });

    // After all test cases
    after((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    // Test POST
    describe("Post a user", () => {
        it("Should post a user to db", (done) => {
            let user = {
                username: faker.internet.userName(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                dob: faker.date.past(),
                city: faker.address.city(),
                interests: [faker.lorem.word(), faker.lorem.word()]
            };

            chai.request(server)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User added!');
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('_id');
                    post_id = res.body.user._id;
                    done();
                });
        });
    });

    // Test GET
    describe("Get all users", () => {
        it("Should return all users", (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    // Test GET/:ID
    describe("Get a user", () => {
        it("Should return the user with the given id", (done) => {
            chai.request(server)
                .get('/user/' + post_id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(post_id);
                    done();
                });
        });
    });

    // Test DELETE/:ID
    describe("Delete a user", () => {
        it("Should delete the user with the given id", (done) => {
            chai.request(server)
                .delete('/user/' + post_id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User deleted!');
                    done();
                });
        });
    });

    // Test PUT/:ID
    describe("Update a user", () => {
        it("Should update the user with the given id", (done) => {
            let user = {
                username: faker.internet.userName(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                dob: faker.date.past(),
                city: faker.address.city(),
                interests: [faker.lorem.word(), faker.lorem.word()]
            }

            chai.request(server)
                .put('/user/' + post_id)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User updated!');
                    done();
                });
        });
    });
});

