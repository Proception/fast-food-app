import uuid from 'uuid/v4';
import Menu from '../models/menus';
import { jsonIsEmpty as validate } from '../utils/validate';
// const validate = require('../utils/validate');

const menu = new Menu(uuid(), 'Egusi', 500000, 4, 'addon');
const menu1 = new Menu(uuid(), 'Fufu', 700000, 5, 'core');
const menu2 = new Menu(uuid(), 'White Rice', 600000, 5, 'Soups');
const menu3 = new Menu('12345', 'Yam Porridge', 900000, 12, 'Stew');

const mapMenuList = new Map([[menu.menuId, menu], [menu1.menuId, menu1],
  [menu2.menuId, menu2], [menu3.menuId, menu3]]);

// Display list of all Menus.
function getMenuList(req, res) {
  res.status(200).send(mapMenuList);
}

// Create New Menu.
function createMenu(req, res) {
  // Get POST params
  const json = req.body;
  let status;


  // Populate List in Memory if object is not empty
  if (!(validate(json))) {
    const newMenu = new Menu(uuid(), json.name,
      json.price, json.quantity,
      json.type);
    mapMenuList.set(newMenu.menuId, newMenu);
    status = 201;
  } else {
    status = 204;
  }
  res.status(status).end();
}

// Get single menu by Id
function getMenu(req, res) {
  const { menuid } = req.params;
  const menuFound = mapMenuList.get(menuid);

  const status = (menuFound === undefined) ? 204 : 200;
  res.status(status).send(menuFound);
}

// Update menu by Id
function updateMenu(req, res) {
  const { menuid } = req.params;
  // Get params in body
  const {
    name, price, quantity, type,
  } = req.body;

  const updateData = new Menu(menuid, name, price, quantity, type);

  const menuFound = mapMenuList.get(menuid);
  const status = (menuFound === undefined) ? 204 : 201;
  // update if the menu object
  if (status === 201) {
    mapMenuList.set(updateData.menuId, updateData);
  }
  res.status(status).end();
}

// delete Order by Id
function deleteMenu(req, res) {
  const { menuid } = req.params;

  // set status based on whether or not menu was found
  const status = (mapMenuList.delete(menuid)) ? 201 : 204;

  res.status(status).end();
}
// exports a function declared earlier
export {
  getMenuList, createMenu, getMenu, updateMenu, deleteMenu,
};
