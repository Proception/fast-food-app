/* global document, window */
import Consumer from 'consumer';
import Decodejwt from 'decodejwt';
import Order from 'order';

const tokenData = new Decodejwt(localStorage.getItem('token'));
const userId = tokenData.getId();

// const consumerObj = new Consumer(`http://127.0.0.1:3012/api/v1/users/${userId}/orders`);
const consumerObj = new Consumer(`http://127.0.0.1:3012/api/v1/users/1/orders`);

const statusMap = new Map();
statusMap.set('Accept', 'Processing');
statusMap.set('Decline', 'Cancelled');
statusMap.set('Mark As Fullfilled', 'Completed');

let ordersMap;

const mapOrderList = new Map();

// console.log('Items : ', consumerObj.getAllItems());


const orders = {
	orders: [],
    createOrderDiv(id, date, price, status, address, naira){
        const parentElement = document.createElement('div');
        const orderDetailsDiv = document.createElement('div');
        const orderDetailsCmd = document.createElement('div');

        // item details p
        const NnewLine = document.createElement('p');
        const DnewLine = document.createElement('p');
        const PnewLine = document.createElement('p');
        const SnewLine = document.createElement('p');
        const AnewLine = document.createElement('p');

        //order detials label
        const Nlabel = document.createElement('Label');
        const Dlabel = document.createElement('Label');
        const Plabel = document.createElement('Label');
        const Slabel = document.createElement('Label');
        const Alabel = document.createElement('Label');

        //order details btn
        const btnAccept = document.createElement('input');
        const btnDecline = document.createElement('input');
        const btnFulfill = document.createElement('input');

        //span item details
        const orderNoSpan = document.createElement('span');
        const orderDateSpan = document.createElement('span');
        const orderPriceSpan = document.createElement('span');
        const orderStatusSpan = document.createElement('span');
        const orderAddressSpan = document.createElement('span');


        const lorderNo = Nlabel;
        const lorderDate = Dlabel;
        const lorderPrice = Plabel;
        const lorderStatus = Slabel;
        const lorderAddress = Alabel;

        const orderNo = NnewLine;
        const orderDate = DnewLine;
        const orderPrice = PnewLine;
        const orderStatus = SnewLine;
        const orderAddress = AnewLine;

        const btnAccNewLine = document.createElement('p');
        const btnDecNewLine = document.createElement('p');
        const btnFullNewLine = document.createElement('p');

        const btnAcc = btnAccNewLine;
        const btnDec = btnDecNewLine;
        const btnFul = btnFullNewLine;
        // parent Attr
        parentElement.setAttribute('class', 'new-order');
        orderDetailsDiv.setAttribute('class', 'order-details');
        orderDetailsCmd.setAttribute('class', 'order-commands');

        //btn commands attr

        if(orderStatus === 'Cancelled'){
            btnAccept.setAttribute('class', 'button');
            btnAccept.setAttribute('type', 'button');
            btnAccept.setAttribute('value', 'Accept');
            btnAccept.setAttribute('name', '');
            btnAccept.setAttribute('id', id);
        }else{
            btnAccept.setAttribute('class', 'button');
            btnAccept.setAttribute('type', 'button');
            btnAccept.setAttribute('value', 'Accept');
            btnAccept.setAttribute('name', '');
            btnAccept.setAttribute('id', id);
        }


        if(orderStatus === 'Processing'){
            btnDecline.setAttribute('class', 'button');
            btnDecline.setAttribute('type', 'button');
            btnDecline.setAttribute('value', 'Decline');
            btnDecline.setAttribute('name', '');
            btnDecline.setAttribute('id', id);
            btnDecline.setAttribute('disabled', true);
        }else{
            btnDecline.setAttribute('class', 'button');
            btnDecline.setAttribute('type', 'button');
            btnDecline.setAttribute('value', 'Decline');
            btnDecline.setAttribute('name', '');
            btnDecline.setAttribute('id', id);
        }
        if(orderStatus === 'New'){
            btnFulfill.setAttribute('class', 'button');
            btnFulfill.setAttribute('type', 'button');
            btnFulfill.setAttribute('value', 'Mark As Fullfilled');
            btnFulfill.setAttribute('name', '');
            btnFulfill.setAttribute('id', id);
            btnFulfill.setAttribute('disabled',true);
        }else{
            btnFulfill.setAttribute('class', 'button');
            btnFulfill.setAttribute('type', 'button');
            btnFulfill.setAttribute('value', 'Mark As Fullfilled');
            btnFulfill.setAttribute('name', '');
            btnFulfill.setAttribute('id', id);
        }
        //parameters span name
        orderNoSpan.appendChild(document.createTextNode(id));
        orderDateSpan.appendChild(document.createTextNode(date));
        orderPriceSpan.appendChild(document.createTextNode(naira + price));
        orderStatusSpan.appendChild(document.createTextNode(status));
        orderAddressSpan.appendChild(document.createTextNode(address));

        lorderNo.setAttribute('for', 'orderId');
        lorderNo.appendChild(document.createTextNode('Order ID :'));
        lorderNo.appendChild(orderNoSpan);

        lorderDate.setAttribute('for', 'orderDate');
        lorderDate.appendChild(document.createTextNode('Order Date :'));
        lorderDate.appendChild(orderDateSpan);

        lorderPrice.setAttribute('for', 'orderPrice');
        lorderPrice.appendChild(document.createTextNode('Order Price :'));
        lorderPrice.appendChild(orderPriceSpan);

        lorderStatus.setAttribute('for', 'orderStatus');
        lorderStatus.appendChild(document.createTextNode('Order Status :'));
        lorderStatus.appendChild(orderStatusSpan);

        lorderAddress.setAttribute('for', 'orderAddress');
        lorderAddress.appendChild(document.createTextNode('Order Address :'));
        lorderAddress.appendChild(orderAddressSpan);

        orderNo.appendChild(lorderNo);
        orderDate.appendChild(lorderDate);
        orderPrice.appendChild(lorderPrice);
        orderStatus.appendChild(lorderStatus);
        orderAddress.appendChild(lorderAddress);

        orderDetailsDiv.appendChild(orderNo);
        orderDetailsDiv.appendChild(orderDate);
        orderDetailsDiv.appendChild(orderPrice);
        orderDetailsDiv.appendChild(orderStatus);
        orderDetailsDiv.appendChild(orderAddress);

        btnAcc.appendChild(btnAccept);
        btnDec.appendChild(btnDecline);
        btnFul.appendChild(btnFulfill);

        orderDetailsCmd.appendChild(btnAcc);
        orderDetailsCmd.appendChild(btnDec);
        orderDetailsCmd.appendChild(btnFul);

        parentElement.appendChild(orderDetailsDiv);
        parentElement.appendChild(orderDetailsCmd);

        return parentElement;
    },
	async getOrders() {
		console.log('user ID : ', userId);
                const res = await consumerObj.getAllItems().then(response => response.json())
                .then(response => {
                    console.log('Success: ', JSON.stringify(response));
                    return response;
                }).catch(error => {
                    console.error('Error:', error);
                });
		return res;
	},
    loadOrders(item){
            document.getElementById('sec')
            .appendChild(
                    this.createOrderDiv(item.orderId, 
                            item.orderDate, item.orderAmount, 
                            item.orderStatus, 
                            item.shippingAddress, '\u20A6'));
    },
    initSort(){
            const sortElement  = document.getElementById('sort');
            console.log('sortElement ', sortElement);
            const options = sortElement.querySelectorAll('option');
            [].forEach.call(options, option => {
                    option.addEventListener('click', function () {
                        console.log('Filtering by ', this.value);
                        handlers.displayOrders(this.value);
                    });
            });
    },
    async updateOrder(orderId, status){
        const consumer = new Consumer(`http://127.0.0.1:3012/api/v1/orders/`);

        await consumer.updateOrder(orderId, statusMap.get(status)).then(response => response.json()).then(response => {
            console.log('Success: ', JSON.stringify(response));
            location.reload();
        }).catch(error => {
            console.error('Error:', error);
        });
    },
	isLoggedIn() {
		const currentTime = (new Date()).getTime() / 1000;
		if(tokenData.token !== "undefined" && tokenData.getToken() !== null && tokenData.getExpTime() > currentTime) {
			return true;
		}else{
			return false;
		}
	},
}


const handlers = {
	handlers: [],

	displayOrders(status){
        let orderFilter = [];
        mapOrderList.forEach( item =>{
            if (item.orderStatus === status){
                orderFilter.push(item);
            }
        });
        const itemsLoaded = document.getElementById('sec');

        while (itemsLoaded.firstChild) {
            itemsLoaded.removeChild(itemsLoaded.firstChild);
        };

        console.log('filtered', orderFilter);
        orderFilter.forEach(item => {
                orders.loadOrders(item);
        });
        //Initiallize buttons with event listeners to get the id
        this.init();
	},
	userStatus() {
		if(orders.isLoggedIn()){
			console.log('user is currently logged in');
		}else{
			console.log('user is not logged in, redirecting ...');
			window.location.href = 'login.html';
		}
	},
    init(){
            const buttons = document.querySelectorAll("input[type='button']");
            console.log('Buttons : ',buttons);
            buttons.forEach((elem) => {
              elem.addEventListener('click', function () {
                // alert('id');
                orders.updateOrder(this.id, this.value);
              });
            });
            orders.initSort();
    },
    async initOrders(){
            let ordersArray = await orders.getOrders();
            ordersArray.data.forEach(item => {
                    ordersMap = new Order(
                            item.order_id, 
                            item.order_date, 
                            item.order_amount, 
                            item.order_status, 
                            item.shipping_address, 
                            item.user_id);
                    mapOrderList.set(ordersMap.orderId, ordersMap);
            });
            console.log('mapOrderList size : ', mapOrderList.size);
            this.displayOrders('New');
    },
}

handlers.userStatus();
handlers.initOrders();
// handlers.displayOrders('New');

handlers.init();