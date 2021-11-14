export class Contact {
  name: String;
  lastName: String;
  number: Number;
  address: String;

  constructor(name: String, lastName: String, number: Number, address: String) {
    this.name = name.toUpperCase();
    this.lastName = lastName.toUpperCase();
    this.number = number;
    this.address = address;
  }
}
