export class Errors {
  code: Number;
  message: String;

  constructor(code: Number, message: String) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg: String) {
    return new Errors(400, msg);
  }

  static internal(msg: String) {
    return new Errors(500, msg);
  }
}
