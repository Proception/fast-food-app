// Require controller modules.
import * as menuController from '../controllers/menuController';

const express = require('express');

const router = express.Router();


// GET request for returning all Menus
router.get('/', menuController.getMenuList);

// GET request for returning Menu based on id
router.get('/:menuid', menuController.getMenu);

// POST request for posting data
router.post('/', menuController.createMenu);

// PUT request for returning all Menus
router.put('/:menuid', menuController.updateMenu);

// DELETE request to Delete menu by ID
router.delete('/:menuid', menuController.deleteMenu);

export default router;
