// Require controller modules.
import uuid from 'uuid/v4';
import Order from '../models/orders';
import Menu from '../models/menus';
import OrderController from '../controllers/orderController';

const express = require('express');

const router = express.Router();
// console.log('order router');

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

// const orderdb = new OrderDB();

// console.log("orderdb obj", orderdb.getAllOrders, "order controllers", OrderController);

const orders = new OrderController(response, mapOrderList);

// GET request for returning all orders
router.get('/', async (req, res) => {
  // console.log('query',query);
  const resObj = await orders.getOrderList();

  res.status(resObj.code).json(resObj);
});

// GET request for returning order based on id
router.get('/:id', async (req, res) => {
  // console.log("Without : ", orders.getOrder(req, res));
  const resObj = await orders.getOrder(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});
// POST request for posting data
router.post('/', async (req, res) => {
  // console.log("Without : ", orders.createOrder(req, res));
  const resObj = await orders.createOrder(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// PUT request for returning all orders
router.put('/:id', async (req, res) => {
  // console.log("Without : ", orders.updateOrder(req, res));
  const resObj = await orders.updateOrder(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// DELETE request to Delete order by ID
router.delete('/:id', async (req, res) => {
  // console.log("Without : ", orders.deleteOrder(req, res));
  const status = await orders.deleteOrder(req, res);
  // console.log(resObj);
  res.status(status).json();
});

export default router;
