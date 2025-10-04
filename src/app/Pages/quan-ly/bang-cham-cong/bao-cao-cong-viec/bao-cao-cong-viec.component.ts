import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'bao-cao-cong-viec',
  templateUrl: './bao-cao-cong-viec.component.html',
  standalone: false
})
export class BaoCaoCongViecModal {
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