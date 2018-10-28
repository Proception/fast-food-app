export default class Consumer {
  constructor(url) {
    this.url = url;
    this.headers = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "x-access-token": localStorage.getItem('token'),
    });

  }

  getAllItems() {
    //get

    console.log("headers", this.headers.get('x-access-token'));
    console.log("url", this.url);

    return fetch(this.url, {
      method: "GET",
      mode: "cors",
      headers: this.headers,
    })
  }

  addItem(data) {
    //post
    return fetch(this.url, {
      method: "POST",
      mode: "cors",
      headers: this.headers,
      body: JSON.stringify(data),
    })
  }
  updateOrder(orderId, status){
    return fetch(this.url + orderId, {
      method: "PUT",
      mode: "cors",
      headers: this.headers,
      body: JSON.stringify({'orderStatus' : status}),
    })
  }

  getItem(itemId) {
    //get
  }

  updateItem(itemId, data) {
    //put
  }

  deleteItem(itemId) {
    //delete
  }

}
