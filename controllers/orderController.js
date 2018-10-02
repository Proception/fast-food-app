import uuid from 'uuid/v4';
import Order from '../models/orders';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
import orderdb from '../db/index';
import orderquery from '../db/orders';
// const validate = require('../utils/validate');

export default class OrderController {
  // Display list of all Orders.
  constructor(response, mapOrderList) {
    this.response = response;
    this.mapOrderList = mapOrderList;
  }

  async getOrderList() {
    const status = 200;
    const response = await orderdb.query(orderquery.queryAllOrders())
    .then(data => { return this.response = new Response('Ok', status, '', data.rows); } );

    return response;
  }


  // Create New Order.
  async createOrder(req) {
    // Get POST params
    const json = req.body;
    let status;


    // Populate List in Memory if object is not empty
    if (!(validate(json))) {

      status = 201;
      const response = await orderdb.query(orderquery.createOrder(uuid(), new Date(), json.orderAmount, 'New', json.shippingAddress, json.userId));
      
      // console.log('rowCount', response.rowCount);
        // .then(data => { return this.response = new Response('Ok', status, '', data.rows); } )
        // .catch( data => {return this.response = new Response('Not Okay', 400, 'Unable To Create Order', json)}));
      this.response = new Response('Ok', status, '', json);
      // console.log(response, status);
    } else {
      status = 400;
      this.response = new Response('Not OK', status, 'Unable To Create Order', json);
      // console.log(response, status);
    }
    // res.status(status).send(response).end();
    return this.response;
  }

  // Get single Order by Id
  async getOrder(req) {
    const { id } = req.params;
    const orderFound = await orderdb.query(orderquery.queryOrder(id));
    // console.log('Found : ', orderFound.rows);
    const status = (orderFound.rows.length === 0) ? 400 : 200;
    if (status === 200) {
      this.response = new Response('Ok', status, '', orderFound.rows);
      // console.log(response, status);
    } else {
      this.response = new Response('Ok', status, 'Order does not Exist', '');
      // console.log(response, status);
    }
    return this.response;
  }

  // Update Order by Id
  async updateOrder(req) {
    const { id } = req.params;
    // Get params in body
    const { orderStatus } = req.body;
    const orderFound = await orderdb.query(orderquery.queryOrder(id));

    const status = (orderFound.rowCount === 0) ? 400 : await orderdb.query(orderquery.updateOrder(id, orderStatus));

    // console.log("orderFound :", orderFound);
    // Set status
    if (status.rowCount === 1) {

      // console.log('rowCount', status.rowCount);

      orderFound.orderStatus = orderStatus;
      this.response = new Response('Ok', 201, '', orderFound.rows[0]);
      // console.log(response, status);
    } else {
      this.response = new Response('Not Ok', status, 'Order Does not exist', '');
      // console.log(response, status);
    }
    return this.response;
  }

  // delete Order by Id
  async deleteOrder(req) {
    const { id } = req.params;
    const { rowCount } = await orderdb.query(orderquery.deleteOrder(id));

    // console.log('rowCount ', rowCount);
    const status = rowCount === 1 ? 201 : 400;
    return status;
  }
}
// exports a function declared earlier
// export {
//   getOrderList, createOrder, getOrder, updateOrder, deleteOrder,
// };
