import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ThemSuaCongTyModal } from "./them-sua-cong-ty/them-sua-cong-ty.component";

@Component({
  selector: "cong-ty-component",
  templateUrl: "./cong-ty.component.html",
  styleUrls: ["cong-ty.component.scss"],
  standalone: false,
})
export class CongTyComponent {
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên công ty",
      key: "companyName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Mã số thuế",
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
  ];
  listDatas: any[] = [
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
    {
      companyName: "Công ty Cổ phần Công nghệ Sao Mai",
      taxNumber: "0201234567",
      phone: "0901 234 567",
      address: "78 Bạch Đằng, Đà Nẵng",
    },
  ];
  constructor(
    private modalService: NgbModal
  ) {
    
  }
  addEditComany(data = null) {
    if (!data) {
      const modal = this.modalService.open(ThemSuaCongTyModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.result.then((result) => {

      })
    } else {
      const modal = this.modalService.open(ThemSuaCongTyModal, {
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