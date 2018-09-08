// Require controller modules.
import * as orderController from '../controllers/orderController';

const express = require('express');

const router = express.Router();
// console.log('order router');


// GET request for returning all orders
router.get('/', orderController.getOrderList);

// GET request for returning order based on id
router.get('/:id', orderController.getOrder);

// POST request for posting data
router.post('/', orderController.createOrder);

// PUT request for returning all orders
router.put('/:id', orderController.updateOrder);

// DELETE request to Delete order by ID
router.delete('/:id', orderController.deleteOrder);

export default router;
