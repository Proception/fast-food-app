import uuid from 'uuid/v4';
import Order from '../models/orders';
import { jsonIsEmpty as validate } from '../utils/validate';
// const validate = require('../utils/validate');

const order = new Order(uuid(), '12/13/2018', 500000, 'new', '13, ayoade str, shomolu');
const order1 = new Order(uuid(), '12/13/2019', 700000, 'fulfilled', '14, ayoade str, shomolu');
const order2 = new Order(uuid(), '12/13/2017', 600000, 'declined', '15, ayoade str, shomolu');
const order3 = new Order('12245', '12/13/2020', 900000, 'accepted', '16, ayoade str, shomolu');

const mapOrderList = new Map([[order.orderId, order], [order1.orderId, order1],
  [order2.orderId, order2], [order3.orderId, order3]]);

// Display list of all Orders.
function getOrderList(req, res) {
  res.status(200).send(mapOrderList);
}

// Create New Order.
function createOrder(req, res) {
  // Get POST params
  const json = req.body;
  let status;


  // Populate List in Memory if object is not empty
  if (!(validate(json))) {
    const newOrder = new Order(json.orderId, json.orderDate,
      json.orderAmount, json.orderStatus,
      json.shippingAddress);
    mapOrderList.set(newOrder.orderId, newOrder);
    status = 201;
  } else {
    status = 204;
  }
  res.status(status).end();
}

// Get single Order by Id
function getOrder(req, res) {
  const { id } = req.params;
  const orderFound = mapOrderList.get(id);
  // console.log('Found : ', orderFound);
  const status = (orderFound === undefined) ? 204 : 200;
  res.status(status).send(orderFound);
}

// Update Order by Id
function updateOrder(req, res) {
  const { id } = req.params;
  // Get params in body
  const { orderStatus } = req.body;
  const orderFound = mapOrderList.get(id);
  const status = (orderFound === undefined) ? 204 : 201;
  // Set status
  if (status === 201) {
    orderFound.orderStatus = orderStatus;
  }
  res.status(status).end();
}

// delete Order by Id
function deleteOrder(req, res) {
  const { id } = req.params;
  const status = (mapOrderList.delete(id)) ? 201 : 204;
  res.status(status).end();
}
// exports a function declared earlier
export {
  getOrderList, createOrder, getOrder, updateOrder, deleteOrder,
};
