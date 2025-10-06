export class CongTyModel {
  id: number;
  name: string;
  address: string;
  phone: string;
  taxCode: string;
  isActive: number;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;

  constructor(
    id: number = 0,
    name: string = "",
    address: string = "",
    phone: string = "",
    taxCode: string = "",
    isActive: number = 0,
    createdBy: string = "",
    createdDate: string = "",
    updatedBy: string = "",
    updatedDate: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.taxCode = taxCode;
    this.isActive = isActive;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedBy = updatedBy;
    this.updatedDate = updatedDate;
  }
}
