import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "confirm-modal",
  templateUrl: "./cofirm-modal.component.html",
  standalone: false,
})
export class ConfirmModal {
  constructor(private modal: NgbActiveModal) {}
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
  }
}