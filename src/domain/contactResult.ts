export class ContactsResult {
  message: String;
  code: Number;
  contact: Object;

  constructor(message: String, code: Number, contact: Object) {
    this.message = message;
    this.code = code;
    this.contact = contact;
  }
}
