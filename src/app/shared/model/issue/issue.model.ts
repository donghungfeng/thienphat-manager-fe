import { NhanVienModel } from "../nhan-vien/nhan-vien.model";

export class IssueModel {
  id: number;
  isActive: number;
  code: string;
  create: NhanVienModel;
  assign: NhanVienModel;
  createdDate: string;
  updatedDate: string;
  resolveDate: string;
  dueDate: any;
  estimate: number;
  title: string;
  description: string;
  url: string;
  type: number;
  priority: number;
  status: number;
  note: string;

  constructor(
    id: number = 0,
    isActive: number = 0,
    code: string = "",
    create: NhanVienModel = new NhanVienModel(),
    assign: NhanVienModel = new NhanVienModel(),
    createdDate: string = "",
    updatedDate: string = "",
    resolveDate: string = "",
    dueDate: string = "",
    estimate: number = 0,
    title: string = "",
    description: string = "",
    url: string = "",
    type: number = 0,
    priority: number = 0,
    status: number = 0,
    note: string = ""
  ) {
    this.id = id;
    this.isActive = isActive;
    this.code = code;
    this.create = create;
    this.assign = assign;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.resolveDate = resolveDate;
    this.dueDate = dueDate;
    this.estimate = estimate;
    this.title = title;
    this.description = description;
    this.url = url;
    this.type = type;
    this.priority = priority;
    this.status = status;
    this.note = note;
  }
}
