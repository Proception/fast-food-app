import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

let globaltoken;

before('Setup Token Access', async () => {
  it('Creates a new user', (done) => {
    // console.log("Ouside test globaltoken value 2 : ", globaltoken);
    request.post('/api/v1/auth/signup')
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
  it('Login, User credentials success', (done) => {
    request.post('/api/v1/auth/login')
      .send({
        email: 'omasan.esimaje@gmail.com',
        password: 'mypassword',
      })
      .expect(200)
      .end((err, res) => {
        const token = JSON.parse(res.text);

        globaltoken = token.data;
        done(err);
      });
  });
});


// Testing the save User expecting status 201 of success
describe('Test Suite POST /users', () => {
  it('if user already exists do not create', (done) => {
    request.post('/api/v1/auth/signup')
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
  it('Login, User exists, invalid credentials', (done) => {
    request.post('/api/v1/auth/login')
      .send({
        email: 'omasan.esimaje@gmail.com',
        password: 'mypa',
      })
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('Login, User doesnt exist', (done) => {
    request.post('/api/v1/auth/login')
      .send({
        email: 'omasan.esimaje@il.com',
        password: 'mypassword',
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Login, User credentials success', (done) => {
    request.post('/api/v1/auth/login')
      .send({
        email: 'omasan.esimaje@gmail.com',
        password: 'mypassword',
      })
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the GET a single user based on email expecting status 201 of success
describe('Test Suite GET /users', () => {
  it('returns a list of users', (done) => {
    request.get('/api/v1/users')
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('returns a list of users without token', (done) => {
    request.get('/api/v1/users')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('returns a list of users with invalid token', (done) => {
    request.get('/api/v1/users')
      .set('x-access-token', 'sjdssdfnffmsfsfsdfsdfsf')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets a user based on Email', (done) => {
    request.get('/api/v1/users/1')
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a users orders based on Email with token', (done) => {
    request.get('/api/v1/users/1/orders')
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a users orders based on Email without token', (done) => {
    request.get('/api/v1/users/1/orders')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('gets a users orders based on Email with invalid token', (done) => {
    request.get('/api/v1/users/1/orders')
      .set('x-access-token', 'kdfjdfdkjfjdfdfdkjdkj')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets a users orders based on Email (User orders doesnt exist)', (done) => {
    request.get('/api/v1/users/90/orders')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('gets a user based on Email without token', (done) => {
    request.get('/api/v1/users/1')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('gets a user based on Email with invalid token', (done) => {
    request.get('/api/v1/users/1')
      .set('x-access-token', 'skdfskjkdfksjdfjksfdkj')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets a user based on Email(users doesn exist)', (done) => {
    request.get('/api/v1/users/40')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('gets a users orders based on id', (done) => {
    request.get('/api/v1/users/1/orders')
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a users orders based on Email(users do not exist)', (done) => {
    request.get('/api/v1/users/54/orders')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});


// Testing the Update a single user based on email expecting status 201 of success
describe('Test Suite PUT /users', () => {
  it('Updates roleId of an existing user', (done) => {
    request.put('/api/v1/users/1')
      .set('x-access-token', globaltoken)
      .send({
        roleId: 100,
      })
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of a non existent user', (done) => {
    request.put('/api/v1/users/89')
      .set('x-access-token', globaltoken)
      .send({
        roleId: 100,
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of a non existent user without token', (done) => {
    request.put('/api/v1/users/90')
      .send({
        roleId: 100,
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of a non existent user with invalid token', (done) => {
    request.put('/api/v1/users/87')
      .set('x-access-token', 'dfnsdfsmfndmsnfsmndf')
      .send({
        roleId: 100,
      })
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});


// Testing the Delete a single user based on email expecting status 201 of success
describe('Test Suite DELETE /users', () => {
  // it('Delete an existing user', (done) => {
  //   request.delete('/api/v1/users/1')
  //     .set('x-access-token', globaltoken)
  //     .expect(202)
  //     .end((err) => {
  //       done(err);
  //     });
  // });
  it('Delete an existing user (User doesnt exist)', (done) => {
    request.delete('/api/v1/users/76')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing user (User doesnt exist) without token', (done) => {
    request.delete('/api/v1/users/23')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing user (User doesnt exist) with invalid token', (done) => {
    request.delete('/api/v1/users/32')
      .set('x-access-token', 'dsmnnmfsmndfnmssmnfsmnf')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});
