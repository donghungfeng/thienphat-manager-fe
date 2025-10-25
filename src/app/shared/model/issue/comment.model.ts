import { NhanVienModel } from "../nhan-vien/nhan-vien.model";
import { IssueModel } from "./issue.model";

export class CommentModel {
  id: number
  assign: NhanVienModel
  issue: IssueModel
  createdDate: string
  status: number
  text: string
  time: string
  constructor() {
    this.assign = new NhanVienModel()
    this.issue = new IssueModel()
    this.createdDate = ''
    this.status = 0
    this.text = ''
    this.time = ''
    this.id = 0
  }
}