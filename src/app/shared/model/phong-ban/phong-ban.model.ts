export class PhongBanModel {
  id: number;
  name: string;
  latitude: string;
  longtitude: string;
  isActive: number;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;

  constructor(
    id: number = 0,
    name: string = "",
    latitude: string = "",
    longtitude: string = "",
    isActive: number = 0,
    createdBy: string = "",
    createdDate: string = "",
    updatedBy: string = "",
    updatedDate: string = ""
  ) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longtitude = longtitude;
    this.isActive = isActive;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedBy = updatedBy;
    this.updatedDate = updatedDate;
  }
}
