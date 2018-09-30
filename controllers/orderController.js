import uuid from 'uuid/v4';
import Order from '../models/orders';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
// const validate = require('../utils/validate');

export default class OrderController {
  // Display list of all Orders.
  constructor(response, mapOrderList) {
    this.response = response;
    this.mapOrderList = mapOrderList;
  }

  getOrderList() {
    const status = 200;
    this.response = new Response('Ok', status, '', this.mapOrderList);
    // console.log(response, status);
    // res.status(status).send(response);
    return this.response;
  }

  // Create New Order.
  createOrder(req) {
    // Get POST params
    const json = req.body;
    let status;


    // Populate List in Memory if object is not empty
    if (!(validate(json))) {
      const newOrder = new Order(uuid(), new Date(),
        json.orderAmount, json.orderStatus,
        json.shippingAddress, json.menu, json.userId);
      this.mapOrderList.set(newOrder.orderId, newOrder);
      status = 201;
      this.response = new Response('Ok', status, '', newOrder);
      // console.log(response, status);
    } else {
      status = 400;
      this.response = new Response('NOK', status, 'Unable To Create Order', json);
      // console.log(response, status);
    }
    // res.status(status).send(response).end();
    return this.response;
  }

  // Get single Order by Id
  getOrder(req) {
    const { id } = req.params;
    const orderFound = this.mapOrderList.get(id);
    // console.log('Found : ', orderFound);
    const status = (orderFound === undefined) ? 400 : 200;
    if (status === 200) {
      this.response = new Response('Ok', status, '', orderFound);
      // console.log(response, status);
    } else {
      this.response = new Response('Ok', status, 'Order does not Exist', '');
      // console.log(response, status);
    }
    // res.status(status).send(response).end();
    return this.response;
  }

  // Update Order by Id
  updateOrder(req) {
    const { id } = req.params;
    // Get params in body
    const { orderStatus } = req.body;
    const orderFound = this.mapOrderList.get(id);
    const status = (orderFound === undefined) ? 400 : 201;
    // Set status
    if (status === 201) {
      orderFound.orderStatus = orderStatus;
      this.mapOrderList.set(orderFound.orderId, orderFound);
      this.response = new Response('Ok', status, '', orderFound);
      // console.log(response, status);
    } else {
      this.response = new Response('NOK', status, 'Order Does not exist', '');
      // console.log(response, status);
    }
    // res.status(status).send(response).end();
    return this.response;
  }

  // delete Order by Id
  deleteOrder(req) {
    const { id } = req.params;
    const status = (this.mapOrderList.delete(id)) ? 201 : 400;
    // res.status(status).end();
    return status;
  }
}
// exports a function declared earlier
// export {
//   getOrderList, createOrder, getOrder, updateOrder, deleteOrder,
// };
