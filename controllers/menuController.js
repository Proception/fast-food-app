import uuid from 'uuid/v4';
import Menu from '../models/menus';
import Response from '../models/response';
import { jsonIsEmpty as validate } from '../utils/validate';
// const validate = require('../utils/validate');

const menu = new Menu(uuid(), 'Egusi', 500000, 4, 'addon', new Date());
const menu1 = new Menu(uuid(), 'Fufu', 700000, 5, 'core', new Date());
const menua = new Menu('12345', 'Yam Porridge', 900000, 12, 'Stew', new Date());

let response;

const mapMenuList = new Map([[menu.menuId, menu],
  [menu1.menuId, menu1],
  [menua.menuId, menua]]);

// Display list of all Menus.
function getMenuList(req, res) {
  const status = 200;
  response = new Response('Ok', '', mapMenuList);
  res.status(status).send(response);
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
      json.type, new Date());
    mapMenuList.set(newMenu.menuId, newMenu);
    status = 201;
    response = new Response('Ok', '', newMenu);
    // console.log(response, status);
  } else {
    status = 204;
    response = new Response('NOK', 'Menu Creation Failed', json);
    // console.log(response, status);
  }
  res.status(status).send(response).end();
}

// Get single menu by Id
function getMenu(req, res) {
  const { menuid } = req.params;
  const menuFound = mapMenuList.get(menuid);

  const status = (menuFound === undefined) ? 204 : 200;

  if (status === 204) {
    response = new Response('Ok', 'Menu item Not available', '');
    // console.log(response, status);
  } else {
    response = new Response('Ok', '', menuFound);
    // console.log(response, status);
  }

  res.status(status).send(response).end();
}

// Update menu by Id
function updateMenu(req, res) {
  const { menuid } = req.params;
  // Get params in body
  const {
    name, price, quantity, type,
  } = req.body;

  const updateData = new Menu(menuid, name, price, quantity, type, new Date());

  const menuFound = mapMenuList.get(menuid);
  const status = (menuFound === undefined) ? 204 : 201;
  // update if the menu object
  if (status === 201) {
    mapMenuList.set(updateData.menuId, updateData);
    response = new Response('Ok', '', updateData);
    // console.log(response, status);
  } else {
    response = new Response('Ok', 'Update failed', '');
    // console.log(response, status);
  }
  res.status(status).send(response).end();
}

// delete menu by menuid
function deleteMenu(req, res) {
  const { menuid } = req.params;
  res.status((mapMenuList.delete(menuid)) ? 201 : 204).end();
}

// exports a function declared earlier
export {
  getMenuList, createMenu, getMenu, updateMenu, deleteMenu,
};
