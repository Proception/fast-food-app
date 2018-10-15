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
      mode: "cors",
      headers: this.headers,
    }).then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
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
