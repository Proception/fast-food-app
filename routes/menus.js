// Require controller modules.
import MenuController from '../controllers/menuController';


const express = require('express');

const router = express.Router();

let response;

const menus = new MenuController(response);

// GET request for returning all Menus
router.get('/', async (req, res) => {
  // console.log("Without : ", menus.getMenuList(req, res));
  const resObj = await menus.getMenuList(req, res);
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// GET request for returning Menu based on id
router.get('/:menuid', async (req, res) => {
  // console.log("Without : ", menus.getMenu(req, res));
  const resObj = await menus.getMenu(req, res);
  res.status(resObj.code).json(resObj);
});

// POST request for posting data
router.post('/', async (req, res) => {
  // console.log("Without : ", menus.createMenu(req, res));
  const resObj = await menus.createMenu(req, res);
  res.status(resObj.code).json(resObj);
});
// PUT request for returning all Menus
router.put('/:menuid', async (req, res) => {
  // console.log("Without : ", menus.updateMenu(req, res));
  const resObj = await menus.updateMenu(req, res);
  res.status(resObj.code).json(resObj);
});
// DELETE request to Delete menu by ID
router.delete('/:menuid', async (req, res) => {
  // console.log("Without : ", menus.deleteMenu(req, res));
  const resObj = await menus.deleteMenu(req, res);
  res.status(resObj.code).json(resObj);
});
export default router;
