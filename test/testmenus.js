import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

// In this test it's expected an Menu list
describe('GET /menus', () => {
  it('returns a list of menus', (done) => {
    request.get('/api/v1/menus')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a menu based on menuid', (done) => {
    request.get('/api/v1/menus/12345')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a menu based on menuid(menu doesnt exist)', (done) => {
    request.get('/api/v1/menus/122222')
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the save Menu expecting status 201 of success
describe('POST /menus', () => {
  it('Creates a new menu', (done) => {
    request.post('/api/v1/menus')
      .send({
        name: 'amaassasala',
        price: 700000,
        quantity: 5,
        type: 'asasasasasa',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Fails to create a new menu if json is empty', (done) => {
    request.post('/api/v1/menus')
      .send({})
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Update a single menu based on menuid expecting status 201 of success
describe('PUT /menus', () => {
  it('Updates details of an existing menu', (done) => {
    request.put('/api/v1/menus/12345')
      .send({
        name: 'amaassasala',
        price: 700000,
        quantity: 4,
        type: 'asasasasasa',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of an existing menu (menu doesnt exist)', (done) => {
    request.put('/api/v1/menus/12121212')
      .send({
        name: 'amaassasala',
        price: 700000,
        quantity: 4,
        type: 'asasasasasa',
      })
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Delete a single menu based on menuis expecting status 201 of success
describe('DELETE /menu', () => {
  it('Delete an existing menu', (done) => {
    request.delete('/api/v1/menus/12345')
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing menu (Menu doesnt exist)', (done) => {
    request.delete('/api/v1/menus/12121212121')
      .expect(204)
      .end((err) => {
        done(err);
      });
  });
});
