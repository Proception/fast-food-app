// Require controller modules.
import OrderController from '../controllers/orderController';

const express = require('express');

const router = express.Router();
// console.log('order router');

let response;

const orders = new OrderController(response);

// GET request for returning all orders
router.get('/', async (req, res) => {
  // console.log('incoming Request : ',res);
  const resObj = await orders.getOrderList(req, res);
  res.status(resObj.code).json(resObj);
});

// GET request for returning all orders
router.get('/user', async (req, res) => {
  const resObj = await orders.getUserOrder(req, res);
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
  const resObj = await orders.deleteOrder(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

export default router;
