import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "thong-tin-issue",
  templateUrl: "./thong-tin-issue.component.html",
  standalone: false,
})
export class ThongTinIssueModal {
  @Input() data: any;
  departmentList: any[] = [];
  constructor(private modal: NgbActiveModal) {
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
  }
}