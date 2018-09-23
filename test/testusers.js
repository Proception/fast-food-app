import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

// Testing the save User expecting status 201 of success
describe('POST /users', () => {
  it('Creates a new user', (done) => {
    request.post('/api/v1/users')
      .send({
        email: 'oma32323.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('if user already exists do not create', (done) => {
    request.post('/api/v1/users')
      .send({
        email: 'omasan.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(409)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the GET a single user based on email expecting status 201 of success
describe('GET /users', () => {
  it('returns a list of users', (done) => {
    request.get('/api/v1/users')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a user based on Email', (done) => {
    request.get('/api/v1/users/omasan.esimaje@gmail.com')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a user based on Email(users doesn exist)', (done) => {
    request.get('/api/v1/users/omasan.esimaje@gmail.ccc')
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});


// Testing the Update a single user based on email expecting status 201 of success
describe('PUT /users', () => {
  it('Updates details of an existing user', (done) => {
    request.put('/api/v1/users/omasan.esimaje@gmail.com')
      .send({
        email: 'oma.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of a non existent user', (done) => {
    request.put('/api/v1/users/omasan.esimaje@gma')
      .send({
        email: 'omas.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Delete a single user based on email expecting status 201 of success
describe('DELETE /users', () => {
  it('Delete an existing user', (done) => {
    request.delete('/api/v1/users/omasan.esimaje@gmail.com')
      .expect(202)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing user (User doesnt exist)', (done) => {
    request.delete('/api/v1/users/omasan.esimaje@gmail.cm')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});
