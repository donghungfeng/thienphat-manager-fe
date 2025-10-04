import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'them-cong-viec',
  templateUrl: './them-cong-viec.component.html',
  standalone: false
})
export class ThemCongViecModal {
  @Input() data: any
  form: FormGroup;
  departmentList: any[] = []
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      title: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      content: [""],
    });
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn)
  }
}