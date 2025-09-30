import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'them-sua-khach-hang',
  templateUrl: './them-sua-khach-hang.component.html',
  standalone: false,
})
export class ThemSuaKhachHangModal {
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
      phone: ["", {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
        updateOn: 'change'
      }],
      address: [""],
      companyName: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      zaloId: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      status: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      note: [""],
    });
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn)
  }
}