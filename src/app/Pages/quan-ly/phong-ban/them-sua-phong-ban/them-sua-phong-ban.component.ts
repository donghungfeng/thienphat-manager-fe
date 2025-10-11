import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DepartmentRequestServices } from "src/app/shared/service/request/phong-ban/phong-ban-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: 'them-sua-phong-ban',
  templateUrl: './them-sua-phong-ban.component.html',
  standalone: false
})
export class ThemSuaPhongBanModal implements OnInit {
  @Input() data: any
  @Input() mode = 'add'
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiPhongBan: DepartmentRequestServices
  ) {
    this.form = this.fb.group({
      name: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      factoryName: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      status: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      note: [""],
      latitude: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      longtitude: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      ip: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      threshold: ["", {
        validators: [Validators.required],
        updateOn: 'change'
      }],
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        factoryName: this.data.factoryName,
        status: this.data.status,
        note: this.data.note,
        latitude: this.data.latitude,
        longtitude: this.data.longtitude,
        ip: this.data.ip,
        threshold: this.data.threshold,
      })
      if (this.mode === 'view') {
        this.form.disable()
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
      status: +this.form.value.status,
    };
    if (!this.data) {
      this.spinner.show()
      this.apiPhongBan.create(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thêm mới phòng ban thành công')
          this.closeModal(true)
        }
      })
      .catch(err => {
        this.toast.error(err.error.message)  
      })
      .finally(() => this.spinner.hide())
    } else {
      payload.id = this.data.id
      this.spinner.show()
      this.apiPhongBan.update(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Sửa thông tin phòng ban thành công')
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
}