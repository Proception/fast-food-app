/* global document */
import Manus from 'manu';
import Cart from 'cart';

const menu = new Manus(1, 'Yam and Eggs', 500, 1, 'core', 'images/yam.jpg', new Date(), 500);
const menu1 = new Manus(2, 'White Rice', 300, 1, 'core', 'images/rice.jpg', new Date(), 300);
const menu2 = new Manus(3, 'Fufu', 150, 1, 'core', 'images/fufu.jpg', new Date(), 150);
const menu3 = new Manus(4, 'Beans', 450, 1, 'core', 'images/beans.jpg', new Date(), 450);


const mapMenuList = new Map([[menu.menuId, menu],
  [menu1.menuId, menu1],
  [menu2.menuId, menu2],
  [menu3.menuId, menu3]]);

const myCart = new Cart(mapMenuList);


const handlers = {
  handlers: [],
  addElement(id, imgUrl, name, cost, naira) {
    const parentElement = document.createElement('div');
    const itemDetailsDiv = document.createElement('div');
    const itemDetailsCmd = document.createElement('div');
    const fnewLine = document.createElement('p');
    const pnewLine = document.createElement('p');
    const qnewLine = document.createElement('p');
    const flabel = document.createElement('Label');
    const plabel = document.createElement('Label');
    const qlabel = document.createElement('Label');
    const img = document.createElement('img');
    const qtyInput = document.createElement('input');
    const btnDel = document.createElement('input');
    const foodSpan = document.createElement('span');
    const priceSpan = document.createElement('span');
    const lfood = flabel;
    const lprice = plabel;
    const lqty = qlabel;
    const food = fnewLine;
    const price = pnewLine;
    const quantity = qnewLine;
    const imgNewLine = document.createElement('p');
    const btnNewLine = document.createElement('p');
    const image = imgNewLine;
    const button = btnNewLine;
    // parent Attr
    parentElement.setAttribute('class', 'selected-items');
    itemDetailsDiv.setAttribute('class', 'item-details');
    itemDetailsCmd.setAttribute('class', 'item-commands');

    // img attr
    img.setAttribute('src', imgUrl);

    // quantity
    qtyInput.setAttribute('type', 'number');
    qtyInput.setAttribute('name', id);
    qtyInput.setAttribute('min', '0');
    qtyInput.setAttribute('max', '100');
    qtyInput.setAttribute('step', '1');
    qtyInput.setAttribute('value', '1');

    // delete button
    btnDel.setAttribute('class', 'button');
    btnDel.setAttribute('type', 'button');
    btnDel.setAttribute('value', 'Delete Item');
    btnDel.setAttribute('name', '');
    btnDel.setAttribute('id', id);

    foodSpan.appendChild(document.createTextNode(name));
    // priceSpan.innerHTML = naira;
    priceSpan.appendChild(document.createTextNode(naira + cost));

    lfood.setAttribute('for', 'foodname');
    lfood.appendChild(document.createTextNode('Food Name :'));
    lfood.appendChild(foodSpan);

    lprice.setAttribute('for', 'price');
    lprice.appendChild(document.createTextNode('Price per unit :'));
    lprice.appendChild(priceSpan);

    lqty.setAttribute('for', 'quantity');
    lqty.appendChild(document.createTextNode('Qty :'));
    lqty.appendChild(qtyInput);

    food.appendChild(lfood);
    price.appendChild(lprice);
    quantity.appendChild(lqty);

    itemDetailsDiv.appendChild(food);
    itemDetailsDiv.appendChild(price);
    itemDetailsDiv.appendChild(quantity);

    image.appendChild(img);
    button.appendChild(btnDel);

    itemDetailsCmd.appendChild(image);
    itemDetailsCmd.appendChild(button);

    parentElement.appendChild(itemDetailsDiv);
    parentElement.appendChild(itemDetailsCmd);

    return parentElement;
  },
  logMapElements(value) {
    const x = this.addElement(value.menuId, value.imgUrl, value.name, value.price, '\u20A6');

    document.getElementById('sec').appendChild(x);
  },
  updateTotalAmount(sign, amount) {
    const totalDiv = document.getElementById('total');
    totalDiv.innerHTML = sign + amount;
  },
  removeChild() {
    const myNode = document.getElementById('sec');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    myCart.getAllItems().forEach(value => this.logMapElements(value));
    const buttons = document.querySelectorAll("input[type='button']");
    buttons.forEach((elem) => {
      elem.addEventListener('click', function () {
        // alert(this.id);
        myCart.removeItem(Number(this.id));
        handlers.removeChild();
        handlers.updateTotalAmount('\u20A6', myCart.getTotal());
      });
    });

    const quantity = document.querySelectorAll("input[type='number']");
    quantity.forEach((elem) => {
      elem.addEventListener('click', function () {
        const menuObj = myCart.getItem(Number(this.name));
        myCart.updateQuatity(menuObj, Number(this.value));
        handlers.updateTotalAmount('\u20A6', myCart.getTotal());
      });
    });
  },
  init() {
    myCart.getAllItems().forEach(value => this.logMapElements(value));

    const buttons = document.querySelectorAll("input[type='button']");
    buttons.forEach((elem) => {
      elem.addEventListener('click', function () {
        myCart.removeItem(Number(this.id));
        handlers.removeChild();
        handlers.updateTotalAmount('\u20A6', myCart.getTotal());
      });
    });
    const quantity = document.querySelectorAll("input[type='number']");
    quantity.forEach((elem) => {
      elem.addEventListener('click', function () {
        const menuObj = myCart.getItem(Number(this.name));
        myCart.updateQuatity(menuObj, Number(this.value));
        handlers.updateTotalAmount('\u20A6', myCart.getTotal());
      });
    });
    const check = document.getElementById('checkout');
    check.addEventListener('click', () => {
      handlers.checkout();
    });
  },
  checkout() {


  },
};

handlers.init();
handlers.updateTotalAmount('\u20A6', myCart.getTotal());
