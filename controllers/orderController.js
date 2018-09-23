import uuid from 'uuid/v4';
import Order from '../models/orders';
import Menu from '../models/menus';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
// const validate = require('../utils/validate');

const menu = new Menu(uuid(), 'rice', 2000, 1, 'core', new Date());
const menu1 = new Menu(uuid(), 'beans', 500, 1, 'core', new Date());
const menu2 = new Menu(uuid(), 'plantain', 300, 2, 'core', new Date());

const menuList1 = [menu, menu2];
const menuList2 = [menu1, menu2];
const menuList3 = [menu, menu1, menu2];

const order = new Order(uuid(), new Date(), 500000, 'new', '13, ayoade str, shomolu', menuList3, 'omasan.esimaje@gmail.com');
const order1 = new Order(uuid(), new Date(), 700000, 'fulfilled', '14, ayoade str, shomolu', menuList2, 'oman.esimaje@gmail.com');
const order2 = new Order(uuid(), new Date(), 600000, 'declined', '15, ayoade str, shomolu', menuList2, 'esimaje@gmail.com');
const order3 = new Order('12245', new Date(), 900000, 'accepted', '16, ayoade str, shomolu', menuList1, 'omasan@gmail.com');


let response;

const mapOrderList = new Map([[order.orderId, order], [order1.orderId, order1],
  [order2.orderId, order2], [order3.orderId, order3]]);

// Display list of all Orders.
function getOrderList(req, res) {
  const status = 200;
  response = new Response('Ok', '', mapOrderList);
  // console.log(response, status);
  res.status(status).send(response);
}

// Create New Order.
function createOrder(req, res) {
  // Get POST params
  const json = req.body;
  let status;


  // Populate List in Memory if object is not empty
  if (!(validate(json))) {
    const newOrder = new Order(uuid(), new Date(),
      json.orderAmount, json.orderStatus,
      json.shippingAddress, json.menu, json.userId);
    mapOrderList.set(newOrder.orderId, newOrder);
    status = 201;
    response = new Response('Ok', '', newOrder);
    // console.log(response, status);
  } else {
    status = 204;
    response = new Response('Ok', 'Unable To Create Order', json);
    // console.log(response, status);
  }
  res.status(status).send(response).end();
}

// Get single Order by Id
function getOrder(req, res) {
  const { id } = req.params;
  const orderFound = mapOrderList.get(id);
  // console.log('Found : ', orderFound);
  const status = (orderFound === undefined) ? 204 : 200;
  if (status === 200) {
    response = new Response('Ok', '', orderFound);
    // console.log(response, status);
  } else {
    response = new Response('Ok', 'Order does not Exist', '');
    // console.log(response, status);
  }
  res.status(status).send(response).end();
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
    mapOrderList.set(orderFound.orderId, orderFound);
    response = new Response('Ok', '', orderFound);
    // console.log(response, status);
  } else {
    response = new Response('Ok', 'Order Does not exist', '');
    // console.log(response, status);
  }
  res.status(status).send(response).end();
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
