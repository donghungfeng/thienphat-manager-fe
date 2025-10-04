import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'giai-trinh-cham-cong',
  templateUrl: './giai-trinh-cham-cong.component.html',
  standalone: false
})
export class GiaiTrinhChamCongModal {
  @Input() data: any
  form: FormGroup;
  departmentList: any[] = []
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      content: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
    });
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn)
  }
}