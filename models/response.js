export default class Response{
	constructor(status, code, messages, result){
		this.status = status;
		this.code = code;
		this.messages = messages;
		this.result = result;
	}
}
