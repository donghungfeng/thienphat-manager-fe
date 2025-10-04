import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThongTinChamCongModal } from "./thong-tin-cham-cong/thong-tin-cham-cong.component";
import { GiaiTrinhChamCongModal } from "./giai-trinh-cham-cong/giai-trinh-cham-cong.component";
import { BaoCaoCongViecModal } from "./bao-cao-cong-viec/bao-cao-cong-viec.component";

@Component({
  selector: "bang-cham-cong",
  templateUrl: "./bang-cham-cong.component.html",
  styleUrls: ["bang-cham-cong.component.scss"],
  standalone: false,
})
export class BangChamCongComponent {
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên nhân viên",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Thời gian vào",
      key: "phone",
      class: "",
      style: "width: 250px",
    },
    {
      name: "Thời gian ra",
      key: "address",
      class: "",
      style: "width: 250px",
    },
    {
      name: "Tên thiết bị",
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
      name: "Vị trí chấm công vào",
      key: "phone",
      class: "",
      style: "width: 250px",
    },
    {
      name: "Vị trí chấm công ra",
      key: "phone",
      class: "",
      style: "width: 250px",
    },
    {
      name: "Trạng thái",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
  ];
  listDatas: any[] = [
    {
      fullName: "Vũ Ngọc Trâm",
      checkIn: "08:23:40  23/09/2025",
      checkOut: "08:23:40  23/09/2025",
      device: "Iphone",
      deviceCode: "Iphonex9291",
      checkInPosition: "53 Hàng Bông, Hoàn Kiếm",
      checkOutPosition: "53 Hàng Bông, Hoàn Kiếm",
      status: "VALID",
    },
    {
      fullName: "Vũ Ngọc Trâm",
      checkIn: "08:23:40  23/09/2025",
      checkOut: "08:23:40  23/09/2025",
      device: "Iphone",
      deviceCode: "Iphonex9291",
      checkInPosition: "53 Hàng Bông, Hoàn Kiếm",
      checkOutPosition: "53 Hàng Bông, Hoàn Kiếm",
      status: "INVALID",
    },
    {
      fullName: "Vũ Ngọc Trâm",
      checkIn: "08:23:40  23/09/2025",
      checkOut: "08:23:40  23/09/2025",
      device: "Iphone",
      deviceCode: "Iphonex9291",
      checkInPosition: "53 Hàng Bông, Hoàn Kiếm",
      checkOutPosition: "53 Hàng Bông, Hoàn Kiếm",
      status: "EXPLANATION",
    },
  ];
  constructor(private modalService: NgbModal, public svShare: ShareService) {}
  detailLogWorkModal(data = null) {
    const modal = this.modalService.open(ThongTinChamCongModal, {
      centered: true,
      size: "md",
      backdrop: "static",
      keyboard: false,
    });
    modal.result.then((result) => {});
  }
  explanationLogWorkModal(data = null) {
    const modal = this.modalService.open(GiaiTrinhChamCongModal, {
      centered: true,
      size: "md",
      backdrop: "static",
      keyboard: false,
    });
    modal.result.then((result) => {});
  }
  reportLogWorkModal(data = null) {
    const modal = this.modalService.open(BaoCaoCongViecModal, {
      centered: true,
      size: "md",
      backdrop: "static",
      keyboard: false,
    });
    modal.result.then((result) => {});
  }
}