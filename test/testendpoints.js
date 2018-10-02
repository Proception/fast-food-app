import { describe, it } from 'mocha';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

// In this test it's expected an order list
describe('GET /orders', () => {
  it('returns a list of orders', (done) => {
    request.get('/api/v1/orders')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets an order based on ID', (done) => {
    request.get('/api/v1/orders/dsdssddfsfdfsfsfdfsf')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets an order based on ID(Order doesn exist)', (done) => {
    request.get('/api/v1/orders/12245323')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the save Order expecting status 201 of success
describe('POST /orders', () => {
  it('saves a new order', (done) => {
    request.post('/api/v1/orders')
      .send({
        orderAmount: 900000,
        userId: 'omasan.esimaje@gmail.com',
        shippingAddress: '16, ayoade str, shomolu',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('saves a new order(Empty order)', (done) => {
    request.post('/api/v1/orders')
      .send({})
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Update a single order based on Id expecting status 201 of success
describe('PUT /orders', () => {
  it('Updates Status of an existing order', (done) => {
    request.put('/api/v1/orders/dsdssddfsfdfsfsfdfsf')
      .send({
        orderStatus: 'Processing',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Updates Status of an existing order (Order doesnt exist)', (done) => {
    request.put('/api/v1/orders/1224512122')
      .send({
        orderStatus: 'accepted',
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Delete a single order based on Id expecting status 201 of success
describe('DELETE /orders', () => {
  // it('Delete an existing order', (done) => {
  //   request.delete('/api/v1/orders/98203073-17d3-4b66-8758-aa2de2f7a90a')
  //     .expect(201)
  //     .end((err) => {
  //       done(err);
  //     });
  // });
  it('Delete an existing order (Order doesnt exist)', (done) => {
    request.delete('/api/v1/orders/1224532322')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});
