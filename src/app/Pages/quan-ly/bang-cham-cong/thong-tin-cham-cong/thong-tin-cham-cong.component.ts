import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "thong-tin-cham-cong",
  templateUrl: "./thong-tin-cham-cong.component.html",
  standalone: false,
})
export class ThongTinChamCongModal {
  @Input() data: any;
  departmentList: any[] = [];
  constructor(private modal: NgbActiveModal) {
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
  }
}