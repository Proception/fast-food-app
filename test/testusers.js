import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

// In this test it's expected an User list
describe('GET /users', () => {
  it('returns a list of users', (done) => {
    request.get('/api/v1/users')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the save User expecting status 201 of success
describe('POST /users', () => {
  it('Creates a new user', (done) => {
    request.post('/api/v1/users')
      .send({
        email: 'omasan.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the save User expecting status 201 of success
describe('POST /users', () => {
  it('Creates a new user(if user does not exist)', (done) => {
    request.post('/api/v1/users')
      .send({
        email: 'oma.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the GET a single user based on email expecting status 201 of success
describe('GET /users', () => {
  it('gets a user based on Email', (done) => {
    request.get('/api/v1/users/omasan.esimaje@gmail.com')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the GET a single user based on email expecting status 204 if user doesnt exist
describe('GET /users', () => {
  it('gets a user based on Email(users doesn exist)', (done) => {
    request.get('/api/v1/users/omasan.esimaje@gmail.c')
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
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Update a single user based on email expecting status 204 if user doesnt exist
describe('PUT /users', () => {
  it('Updates details of an existing user (User doesnt exist)', (done) => {
    request.put('/api/v1/users/omasan.esimaje@gma')
      .send({
        email: 'omas.esimaje@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});

// // Testing the Update a single user based on email expecting status 204 if user doesnt exist
// describe('PUT /users', () => {
//   it('Updates details of an existing user (Object is updating phone)', (done) => {
//     request.put('/api/v1/users/omasan.esimaje@gmail.com')
//       .send({
//         phoneNo: '07062257273',
//       })
//       .expect(201)
//       .end((err) => {
//         done(err);
//       });
//   });
// });

// // Testing the Update a single user based on email expecting status 204 if user doesnt exist
// describe('PUT /users', () => {
//   it('Updates details of an existing user (Object is updating password)', (done) => {
//     request.put('/api/v1/users/omasan.esimaje@gmail.com')
//       .send({
//         password: 'mypassword',
//       })
//       .expect(201)
//       .end((err) => {
//         done(err);
//       });
//   });
// });

// Testing the Delete a single user based on email expecting status 201 of success
describe('DELETE /users', () => {
  it('Delete an existing user', (done) => {
    request.delete('/api/v1/users/omasan.esimaje@gmail.com')
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Delete a single user based on email expecting status 204 if user doesnt exist
describe('DELETE /users', () => {
  it('Delete an existing user (User doesnt exist)', (done) => {
    request.delete('/api/v1/users/omasan.esimaje@gmail.cm')
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});
