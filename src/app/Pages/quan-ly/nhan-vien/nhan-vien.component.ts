import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThemSuaNhanVienModal } from "./them-sua-nhan-vien/them-sua-nhan-vien.component";

@Component({
  selector: "nhan-vien",
  templateUrl: "./nhan-vien.component.html",
  styleUrls: ["nhan-vien.component.scss"],
  standalone: false,
})
export class NhanVienComponent {
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Username",
      key: "userName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Tên nhân viên",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Số điện thoại",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Địa chỉ",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "CCCD",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Phòng ban",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Thiết bị",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Mã thiết bị",
      key: "phone",
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
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
  ];
  listDatas: any[] = [
    {
      username: "vutramz9x",
      fullName: "Vũ Ngọc Trâm",
      phone: "0912345678",
      address: "Số 5 Hoàn Kiếm, Trung Hòa",
      cccd: "001202043292",
      department: "Marketing",
      device: "Iphone",
      deviceCode: "Iphonex9291",
      status: "ON_HOLD",
      note: "Off thứ 7",
    },
    {
      username: "vutramz9x",
      fullName: "Vũ Ngọc Trâm",
      phone: "0912345678",
      address: "Số 5 Hoàn Kiếm, Trung Hòa",
      cccd: "001202043292",
      department: "Marketing",
      device: "Iphone",
      deviceCode: "Iphonex9291",
      status: "IN_PROGRESS",
      note: "Off thứ 7",
    },
    {
      username: "vutramz9x",
      fullName: "Vũ Ngọc Trâm",
      phone: "0912345678",
      address: "Số 5 Hoàn Kiếm, Trung Hòa",
      cccd: "001202043292",
      department: "Marketing",
      device: "Iphone",
      deviceCode: "Iphonex9291",
      status: "COMPLETED",
      note: "Off thứ 7",
    },
  ];
  constructor(
    private modalService: NgbModal,
    public svShare: ShareService
  ) { }
  addEditEmployee(data = null) {
    if (!data) {
      const modal = this.modalService.open(ThemSuaNhanVienModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.result.then((result) => {});
    } else {
      const modal = this.modalService.open(ThemSuaNhanVienModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.componentInstance.data = data;
      modal.result.then((result) => {});
    }
  }
}