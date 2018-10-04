import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import uuid from 'uuid/v4';
import Order from '../models/orders';
import app from '../app';
import db from '../db/index';
import orderquery from '../db/orders';


const request = supertest(app);
const orderId = uuid();

let globaltoken;
before('Setup DB', async () => {
  const newOrder = new Order(orderId, new Date(),
    300, 'New', 'test addd', 'omasan.menu@gmail.com');
  await db.query(
    orderquery.createOrder(
      newOrder.orderId, newOrder.orderDate,
      newOrder.orderAmount, newOrder.orderStatus,
      newOrder.shippingAddress, newOrder.userId,
    ),
  );
  it('Creates a new user for orders ', (done) => {
    // console.log("Ouside test globaltoken value 2 : ", globaltoken);
    request.post('/api/v1/auth/signup')
      .send({
        email: 'omasan.menu@gmail.com',
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
        email: 'omasan.menu@gmail.com',
        password: 'mypassword',
      })
      .expect(200)
      .end((err, res) => {
        const token = JSON.parse(res.text);

        globaltoken = token.result;
        done(err);
      });
  });
});

// In this test it's expected an order list
describe('GET /orders', () => {
  it('returns a list of orders', (done) => {
    request.get('/api/v1/orders')
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('returns a list of orders without token', (done) => {
    request.get('/api/v1/orders')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('returns a list of orders invalid token', (done) => {
    request.get('/api/v1/orders')
      .set('x-access-token', 'weknksndsdmsmndmsn')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets an order based on ID', (done) => {
    request.get(`/api/v1/orders/${orderId}`)
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets an order based on ID without token', (done) => {
    request.get(`/api/v1/orders/${orderId}`)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('gets an order based on ID invalid token', (done) => {
    request.get(`/api/v1/orders/${orderId}`)
      .set('x-access-token', 'jnmsmsndsnmddmnsdmnsd')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets an order based on ID(Order doesn exist)', (done) => {
    request.get('/api/v1/orders/12245323')
      .set('x-access-token', globaltoken)
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
      .set('x-access-token', globaltoken)
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
      .set('x-access-token', globaltoken)
      .send({})
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('saves a new order(Empty order) without token', (done) => {
    request.post('/api/v1/orders')
      .send({})
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('saves a new order(Empty order) invalid token', (done) => {
    request.post('/api/v1/orders')
      .set('x-access-token', 'smnsmdfmnsnmsfnsmdfnmsdfmnfn')
      .send({})
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Update a single order based on Id expecting status 201 of success
describe('PUT /orders', () => {
  it('Updates Status of an existing order', (done) => {
    request.put(`/api/v1/orders/${orderId}`)
      .set('x-access-token', globaltoken)
      .send({
        orderStatus: 'Processing',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Updates Status of an existing order without token', (done) => {
    request.put(`/api/v1/orders/${orderId}`)
      .send({
        orderStatus: 'Processing',
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Updates Status of an existing order with invalid token', (done) => {
    request.put(`/api/v1/orders/${orderId}`)
      .set('x-access-token', 'mndsmnsddnmdmdsnmdnmsdmnsdnm')
      .send({
        orderStatus: 'Processing',
      })
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('Updates Status of an existing order (Order doesnt exist)', (done) => {
    request.put('/api/v1/orders/1224512122')
      .set('x-access-token', globaltoken)
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
  it('Delete an existing order', (done) => {
    request.delete(`/api/v1/orders/${orderId}`)
      .set('x-access-token', globaltoken)
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing order without token', (done) => {
    request.delete(`/api/v1/orders/${orderId}`)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing order with invalid token', (done) => {
    request.delete(`/api/v1/orders/${orderId}`)
      .set('x-access-token', 'mnmndfmnmndfdf')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing order (Order doesnt exist)', (done) => {
    request.delete('/api/v1/orders/1224532322')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing menu user', (done) => {
    request.delete('/api/v1/users/omasan.menu@gmail.com')
      .set('x-access-token', globaltoken)
      .expect(202)
      .end((err) => {
        done(err);
      });
  });
});
