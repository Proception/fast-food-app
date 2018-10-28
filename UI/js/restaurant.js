/* global document, window */
import Manus from 'manu';
import Cart from 'cart';
import Menu from 'menu';

const menu = new Manus(1, 'Yam and Eggs', 500, 1, 'core', 'images/yam.jpg', new Date());
const menu1 = new Manus(2, 'White Rice', 300, 1, 'core', 'images/rice.jpg', new Date());
const menu2 = new Manus(3, 'Fufu', 150, 1, 'core', 'images/fufu.jpg', new Date());
const menu3 = new Manus(4, 'Beans', 450, 1, 'core', 'images/beans.jpg', new Date());


const mapMenuList = new Map([[menu.menuId, menu],
  [menu1.menuId, menu1],
  [menu2.menuId, menu2],
  [menu3.menuId, menu3]]);

const cartList = new Map();

const myCart = new Cart(cartList);
const myMenu = new Menu(mapMenuList);

const buttons = document.querySelectorAll('button');

console.log(buttons);

const handlers = {
  handlers: [],
  add(id, qty) {
    const menuItem = myMenu.getItem(id);
    myCart.addItem(menuItem, qty);
    document.getElementById('cart').innerHTML = `(${handlers.cartSize()})`;

    // console.log(JSON.stringify([...myCart.getAllItems()]));
    this.saveCart([...myCart.getAllItems()]);
  },
  cartSize() {
    return myCart.getSize();
  },
  getCart() {
    let cart = window.localStorage.getItem('cart');
    cart = JSON.parse(cart);
    // console.log('Parsed Cart :', cart);
    // cart = new Map(cart);
    return cart;
  },
  saveCart(items) {
    window.localStorage.setItem('cart', JSON.stringify(JSON.stringify(items)));
  },

};


buttons.forEach((elem) => {
  elem.addEventListener('click', function () {
    const qty = document.getElementById(this.id).previousElementSibling.value;
    
    console.log('qty : ', qty);
    if(qty !== undefined){
      handlers.add(Number(this.id), Number(qty));
    }else{
      alert('Please Log in to add items to cart');
    }
  });
});
