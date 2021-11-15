import { ContactsResult } from "../../../domain/contactResult";

export class ContactsControllerModel {
  message: String;
  code: Number;
  contact: Object;

  private constructor(message: String, code: Number, contact: Object) {
    this.message = message;
    this.code = code;
    this.contact = contact;
  }

  public static from(contactResult: ContactsResult): ContactsControllerModel {
    return new ContactsControllerModel(
      contactResult.message,
      contactResult.code,
      contactResult.contact
    );
  }
}
