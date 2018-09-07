import { describe, it } from 'mocha';
// import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);
// const { expect } = chai;

// In this test it's expected an order list
describe('GET /orders', () => {
  it('returns a list of orders', (done) => {
    request.get('/api/v1/orders')
      .expect(200)
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
        orderNo: 2323,
        orderDate: '12/13/2020',
        orderAmount: 900000,
        orderStatus: 'accepted',
        shippingAddress: '16, ayoade str, shomolu',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the GET a single order based on Id expecting status 201 of success
describe('GET /orders', () => {
  it('gets an order based on ID', (done) => {
    request.get('/api/v1/orders/12245')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
});


// Testing the Update a single order based on Id expecting status 201 of success
describe('PUT /orders', () => {
  it('Updates Status of an existing order', (done) => {
    request.put('/api/v1/orders/12245')
      .send({
        orderStatus: 'accepted',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
});
