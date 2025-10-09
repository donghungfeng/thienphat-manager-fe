import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CompanyRequestServices } from "src/app/shared/service/request/cong-ty/cong-ty-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: 'them-sua-cong-ty',
  templateUrl: './them-sua-cong-ty.component.html',
  standalone: false
})
export class ThemSuaCongTyModal implements OnInit{
  @Input() data: any
  @Input() mode = 'add'
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private toast: ToastService,
    private apiCompany: CompanyRequestServices,
    private spinner: SpinnerService
  ) {
    this.form = this.fb.group({
      name: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      taxCode: ["", {
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
  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        taxCode: this.data.taxCode,
        phone: this.data.phone,
        address: this.data.address
      })
      if (this.mode === 'view') {
        this.form.get('name').disable()
        this.form.get('taxCode').disable()
        this.form.get('phone').disable()
        this.form.get('address').disable()
      }
    }
  }
  submitForm() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    const payload: any = {
      ...this.form.value
    }
    this.spinner.show()
    if (!this.data) {
      this.apiCompany.create(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thêm mới công ty thành công')
          this.closeModal(true)
        } else {
          this.toast.error("Có lỗi xảy ra, vui lòng thử lại");
        }
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      })
      .finally(() => this.spinner.hide())
    } else {
      payload.id = this.data.id
      this.apiCompany.update(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thay đổi thông tin công ty thành công')
          this.closeModal(true)
        } else {
          this.toast.error("Có lỗi xảy ra, vui lòng thử lại");
        }
      })
      .catch((err) => {
        this.toast.error(err.error.message);
      })
      .finally(() => this.spinner.hide())
    }
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn)
  }
}