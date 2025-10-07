import { PhongBanModel } from "../phong-ban/phong-ban.model";

export class NhanVienModel {
  id: number;
  username: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  status: number;
  isActive: number;
  identityCardNumber: string;
  note: string;
  deviceName: string;
  deviceCode: string;
  department: PhongBanModel;

  constructor(
    id: number = 0,
    username: string = "",
    fullName: string = "",
    address: string = "",
    phone: string = "",
    email: string = "",
    role: string = "",
    status: number = 0,
    isActive: number = 0,
    identityCardNumber: string = "",
    note: string = "",
    deviceName: string = "",
    deviceCode: string = "",
    department: PhongBanModel = new PhongBanModel()
  ) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.role = role;
    this.status = status;
    this.isActive = isActive;
    this.identityCardNumber = identityCardNumber;
    this.note = note;
    this.deviceName = deviceName;
    this.deviceCode = deviceCode;
    this.department = department;
  }
}
