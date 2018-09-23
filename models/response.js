export default class Response {
  constructor(status, messages, result) {
    this.status = status;
    this.messages = messages;
    this.result = result;
  }
}
