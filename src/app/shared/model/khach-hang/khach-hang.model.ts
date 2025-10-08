import { CongTyModel } from "../cong-ty/cong-ty.model";

export class KhachHangModel {
  id: number;
  address: string;
  avatar: string;
  avatar120: string;
  avatar240: string;
  city: string;
  company: CongTyModel;
  createdBy: string;
  createdDate: string;
  displayName: string;
  district: string;
  dynamicParam: string;
  isActive: number;
  isSensitice: boolean;
  name: string;
  notes: any;
  phone: string;
  status: number;
  tagNames: any;
  updatedBy: string;
  updatedDate: string;
  userAlias: string;
  userDob: string;
  userExternalId: string;
  userId: string;
  userIdByApp: string;
  userIsFollower: boolean;
  userLastInteractionDate: string;

  constructor(
    id: number = 0,
    address: string = "",
    avatar: string = "",
    avatar120: string = "",
    avatar240: string = "",
    city: string = "",
    company: CongTyModel = new CongTyModel(),
    createdBy: string = "",
    createdDate: string = "",
    displayName: string = "",
    district: string = "",
    dynamicParam: string = "",
    isActive: number = 0,
    isSensitice: boolean = false,
    name: string = "",
    notes: any = [],
    phone: string = "",
    status: number = 0,
    tagNames: any = [],
    updatedBy: string = "",
    updatedDate: string = "",
    userAlias: string = "",
    userDob: string = "",
    userExternalId: string = "",
    userId: string = "",
    userIdByApp: string = "",
    userIsFollower: boolean = false,
    userLastInteractionDate: string = ""
  ) {
    this.id = id;
    this.address = address;
    this.avatar = avatar;
    this.avatar120 = avatar120;
    this.avatar240 = avatar240;
    this.city = city;
    this.company = company;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.displayName = displayName;
    this.district = district;
    this.dynamicParam = dynamicParam;
    this.isActive = isActive;
    this.isSensitice = isSensitice;
    this.name = name;
    this.notes = notes;
    this.phone = phone;
    this.status = status;
    this.tagNames = tagNames;
    this.updatedBy = updatedBy;
    this.updatedDate = updatedDate;
    this.userAlias = userAlias;
    this.userDob = userDob;
    this.userExternalId = userExternalId;
    this.userId = userId;
    this.userIdByApp = userIdByApp;
    this.userIsFollower = userIsFollower;
    this.userLastInteractionDate = userLastInteractionDate;
  }
}
