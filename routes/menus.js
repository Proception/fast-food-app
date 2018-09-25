// Require controller modules.
import uuid from 'uuid/v4';
import MenuController from '../controllers/menuController';
import Menu from '../models/menus';


const express = require('express');

const router = express.Router();

const menu = new Menu(uuid(), 'Egusi', 500000, 4, 'addon', new Date());
const menu1 = new Menu(uuid(), 'Fufu', 700000, 5, 'core', new Date());
const menua = new Menu('12345', 'Yam Porridge', 900000, 12, 'Stew', new Date());

let response;

const mapMenuList = new Map([[menu.menuId, menu],
  [menu1.menuId, menu1],
  [menua.menuId, menua]]);
const menus = new MenuController(response, mapMenuList);

// GET request for returning all Menus
router.get('/', (req, res) => {
  // console.log("Without : ", menus.getMenuList(req, res));
  const resObj = menus.getMenuList();
  // console.log(resObj);
  res.status(resObj.code).json(resObj);
});

// GET request for returning Menu based on id
router.get('/:menuid', (req, res) => {
  // console.log("Without : ", menus.getMenu(req, res));
  const resObj = menus.getMenu(req, res);
  res.status(resObj.code).json(resObj);
});

// POST request for posting data
router.post('/', (req, res) => {
  // console.log("Without : ", menus.createMenu(req, res));
  const resObj = menus.createMenu(req, res);
  res.status(resObj.code).json(resObj);
});
// PUT request for returning all Menus
router.put('/:menuid', (req, res) => {
  // console.log("Without : ", menus.updateMenu(req, res));
  const resObj = menus.updateMenu(req, res);
  res.status(resObj.code).json(resObj);
});
// DELETE request to Delete menu by ID
router.delete('/:menuid', (req, res) => {
  // console.log("Without : ", menus.deleteMenu(req, res));
  res.status(menus.deleteMenu(req, res)).json();
});
export default router;
