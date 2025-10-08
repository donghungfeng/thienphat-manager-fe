import { HttpResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthRequestServices } from "src/app/shared/service/request/auth/auth-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: 'doi-mat-khau-modal',
  templateUrl: './doi-mat-khau.component.html',
  standalone: false,
})
export class DoiMatKhauModal {
  @Input() data: any
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiUser: AuthRequestServices,
  ) {
    this.form = this.fb.group({
      userId: [''],
      oldPassword: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      newPassword: ['', {
        validators: [Validators.required],
        updateOn: 'change'
      }]
    })
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn)
  }
  submitForm() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    this.spinner.show()
    this.form.patchValue({
      userId: this.data.id,
    })
    const payload = {
      ...this.form.value,
    };
    this.apiUser.changePassword(payload).then((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.toast.success('Đổi mật khẩu thành công')
        this.closeModal(true)
      } else {
        this.toast.error(res.body.result);  
      }
    })
    .catch(err => {
      this.toast.error(err.error.message)  
    })
    .finally(() => this.spinner.hide())
  }
}