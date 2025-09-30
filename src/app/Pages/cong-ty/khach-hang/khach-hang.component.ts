import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ThemSuaKhachHangModal } from "./them-sua-khach-hang/them-sua-khach-hang.component";

@Component({
  selector: "khach-hang-cmp",
  templateUrl: "./khach-hang.component.html",
  styleUrls: ["khach-hang.component.scss"],
  standalone: false,
})
export class KhachHangComponent {
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên khách hàng",
      key: "customerName",
      class: "",
      style: "min-width: 230px",
    },
    {
      name: "Số điện thoại",
      key: "phone",
      class: "",
      style: "min-width: 150px; max-width: 200px",
    },
    {
      name: "Công ty",
      key: "companyName",
      class: "",
      style: "min-width: 400px",
    },
    {
      name: "Địa chỉ",
      key: "address",
      class: "",
      style: "min-width: 350px",
    },
    {
      name: "Zalo ID",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Trạng thái",
      key: "status",
      class: "",
      style: "width: 200px",
    },
  ];
  listDatas: any[] = [
    {
      customerName: "Nguyễn Văn An",
      phone: "0901 234 111",
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      address: "78 Bạch Đằng, Đà Nẵng",
      zaloId: "nguyenvanan_0901234111",
      status: "Canceled",
    },
  ];
  constructor(private modalService: NgbModal) {}
  addEditCustomer(data = null) {
    if (!data) {
      const modal = this.modalService.open(ThemSuaKhachHangModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.result.then((result) => {
      })
    } else {
      const modal = this.modalService.open(ThemSuaKhachHangModal, {
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