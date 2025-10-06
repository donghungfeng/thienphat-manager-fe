export class NhanVienModel {
  id: number;
  username: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  status: number;

  constructor(
    id: number = 0,
    username: string = "",
    fullName: string = "",
    address: string = "",
    phone: string = "",
    email: string = "",
    role: string = "",
    status: number = 0
  ) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.role = role;
    this.status = status;
  }
}
