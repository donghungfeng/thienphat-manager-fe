import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'them-sua-phong-ban',
  templateUrl: './them-sua-phong-ban.component.html',
  standalone: false
})
export class ThemSuaPhongBanModal {
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
      unit: ["", {
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