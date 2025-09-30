import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ThemSuaPhongBanModal } from "./them-sua-phong-ban/them-sua-phong-ban.component";

@Component({
  selector: "phong-ban",
  templateUrl: "./phong-ban.component.html",
  styleUrls: ["phong-ban.component.scss"],
  standalone: false,
})
export class PhongBanComponent {
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên Phòng ban",
      key: "companyName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Tên cơ sở",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Trạng thái",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Ghi chú",
      key: "address",
      class: "",
      style: "width: 350px",
    },
  ];
  listDatas: any[] = [
    {
      companyName: "Phòng Nhân sự",
      taxNumber: "Cơ sở 1",
      phone: "Cancelled",
      address: "Gửi báo cáo tuần trước 17h thứ Sáu.",
    },
  ];
  constructor(private modalService: NgbModal) {}
  addEditDepartment(data = null) {
    if (!data) {
      const modal = this.modalService.open(ThemSuaPhongBanModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.result.then((result) => {
      })
    } else {
      const modal = this.modalService.open(ThemSuaPhongBanModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.componentInstance.data = data
      modal.result.then((result) => {
      })
    }
  }
}