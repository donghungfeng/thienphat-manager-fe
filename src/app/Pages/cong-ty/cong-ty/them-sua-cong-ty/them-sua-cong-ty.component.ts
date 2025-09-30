import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'them-sua-cong-ty',
  templateUrl: './them-sua-cong-ty.component.html',
  standalone: false
})
export class ThemSuaCongTyModal {
  @Input() data: any
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      fullName: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      taxNumber: ["", {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
        updateOn: 'change'
      }],
      phone: ["", {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
        updateOn: 'change'
      }],
      address: [""]
    });
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn)
  }
}