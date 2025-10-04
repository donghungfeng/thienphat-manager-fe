import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThemCongViecModal } from "./them-cong-viec/them-cong-viec.component";

@Component({
  selector: "xu-ly-cong-viec",
  templateUrl: "./xu-ly-cong-viec.component.html",
  styleUrls: ["xu-ly-cong-viec.component.scss"],
  standalone: false,
})
export class XuLyCongViecComponent {
  constructor(private modalService: NgbModal, public svShare: ShareService) {}
  addNewTodo() {
    const modal = this.modalService.open(ThemCongViecModal, {
      centered: true,
      size: "md",
      backdrop: "static",
      keyboard: false,
    });
    modal.result.then((result) => {});
  }
}