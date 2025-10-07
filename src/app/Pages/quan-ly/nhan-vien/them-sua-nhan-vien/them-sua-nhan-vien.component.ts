import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PhongBanModel } from "src/app/shared/model/phong-ban/phong-ban.model";
import { AuthRequestServices } from "src/app/shared/service/request/auth/auth-request.service";
import { DepartmentRequestServices } from "src/app/shared/service/request/phong-ban/phong-ban-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: 'them-sua-nhan-vien',
  templateUrl: './them-sua-nhan-vien.component.html',
  standalone: false
})
export class ThemSuaNhanVienModal implements OnInit {
  @Input() data: any
  @Input() mode = 'add'
  form: FormGroup;
  departmentList: PhongBanModel[] = []
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiUser: AuthRequestServices,
    private apiPhongBan: DepartmentRequestServices
  ) {
    this.form = this.fb.group({
      username: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      password: ["", {
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
      identityCardNumber: ["", {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
        updateOn: 'change'
      }],
      departmentId: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      deviceName: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      deviceCode: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      status: [1],
      note: [""],
    });
  }
  ngOnInit(): void {
    this.getListDepartment()
    if (this.data) {
      this.form.patchValue({
        username: this.data.username,
        fullName: this.data.fullName,
        phone: this.data.phone,
        address: this.data.address,
        identityCardNumber: this.data.identityCardNumber,
        deviceName: this.data.deviceName,
        deviceCode: this.data.deviceCode,
        status: this.data.status,
        departmentId: this.data.department.id
      });
      this.form.get("password")?.clearValidators();
      this.form.get("password")?.updateValueAndValidity();
      if (this.mode === 'view') {
        this.form.disable();
      }
    }
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
    const payload = {
      ...this.form.value,
      status: +this.form.value.status
    }
    if (!this.data) {
      this.spinner.show()
      this.apiUser.create(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thêm mới nhân viên thành công')
          this.closeModal(true)
        }
      })
      .catch(err => {
        this.toast.error(err.error.message)  
      })
      .finally(() => this.spinner.hide())
    } else {
      payload.id = this.data.id
      delete payload.password;
      this.spinner.show()
      this.apiUser.update(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Sửa thông tin nhân viên thành công')
          this.closeModal(true)
        } else {
          this.toast.error(res.body.message)
        }
      })
      .catch(err => {
        this.toast.error(err.error.message)  
      })
      .finally(() => this.spinner.hide())
    }
  }
  getListDepartment() {
    this.spinner.show()
    this.apiPhongBan.getAll().then((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.departmentList = res.body.result 
      } else {
        this.departmentList = []
      }
    })
    .catch(() => this.departmentList = [])
    .finally(() => this.spinner.hide())
  }
}