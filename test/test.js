let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks', () => {
    /**
     * Creating a User with Post
     */
     describe("POST /users", () => {
        it("It should create new user", (done) => {
            const user = {
                description: 'First Blood',
            };
            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_id');
                    response.body.should.have.property('description');
                    response.body.should.have.property('description').eq('First Blood');
                done();
                })
        })
     })
     /**
     * Checking we have One User with Get Route
     */
    describe("GET /users", () => {
        it("It should get all the users", (done) => {
            chai.request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                done();
                })
        })

        it("It should show error if wrong url", (done) => {
            chai.request(server)
                .get("/user")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        })
    })

    /**
     * Creating a Second User
     */
          describe("POST /users", () => {
            it("It should create new user", (done) => {
                const user = {
                    description: 'Double Kill',
                };
                chai.request(server)
                    .post("/users")
                    .send(user)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('user_id');
                        response.body.should.have.property('description');
                        response.body.should.have.property('description').eq('Double Kill');
                    done();
                    })
            })
         })
    /**
     * Checking we have Two Users with GET route
     */
    describe("GET /users", () => {
        it("It should get all the users", (done) => {
            chai.request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(2);
                done();
                })
        })

        it("It should show error if wrong url", (done) => {
            chai.request(server)
                .get("/user")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        })
    })
    /**
     * Check our Second User with GET by ID route
     */
     describe("GET /users/:id", () => {
        it("It should get specific user by the id", (done) => {
            const user_id = 2;
            chai.request(server)
                .get("/users/" + user_id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_id');
                    response.body.should.have.property('description');
                    response.body.should.have.property('user_id').eq(2);
                    response.body.should.have.property('description').eq('Double Kill');
                done();
                })
        })
     })
    
     /**
     * Updating our First User with PUT route
     */
          describe("PUT /users", () => {
            it("It should update user", (done) => {
                const new_user = {
                    description: 'Beyond Godlike',
                };
                chai.request(server)
                    .put("/users/1")
                    .send(new_user)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.eq('User has been updated!');
                    done();
                    })
            })
         })
    /**
     * Check our Updated First User with GET by ID route
     */
          describe("GET /users/:id", () => {
            it("It should get specific user by the id", (done) => {
                const user_id = 1;
                chai.request(server)
                    .get("/users/" + user_id)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('user_id');
                        response.body.should.have.property('description');
                        response.body.should.have.property('user_id').eq(1);
                        response.body.should.have.property('description').eq('Beyond Godlike');
                    done();
                    })
            })
         })

    /**
     * Test the Delete Route
     */
     describe("DELETE /users", () => {
        it("It should delete user", (done) => {
            const user_id = 1;
            chai.request(server)
                .delete("/users/" + user_id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.eq('User was successfully deleted');
                done();
                })
        })
     })

    /**
     * Checking we have One User Left with GET route
     */
    describe("GET /users", () => {
        it("It should get all the users", (done) => {
            chai.request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                done();
                })
        })

        it("It should show error if wrong url", (done) => {
            chai.request(server)
                .get("/user")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        })
    })
     

})