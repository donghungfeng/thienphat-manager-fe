import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'them-sua-nhan-vien',
  templateUrl: './them-sua-nhan-vien.component.html',
  standalone: false
})
export class ThemSuaNhanVienModal {
  @Input() data: any
  form: FormGroup;
  departmentList: any[] = []
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      userName: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      fullName: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      phone: ["", {
        validators: [Validators.required,  Validators.pattern(/^[0-9]+$/)],
        updateOn: 'change'
      }],
      address: [""],
      cccd: ["", {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
        updateOn: 'change'
      }],
      departmentId: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      device: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      deviceCode: ["", {
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