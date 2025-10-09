import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CongTyModel } from "src/app/shared/model/cong-ty/cong-ty.model";
import { CompanyRequestServices } from "src/app/shared/service/request/cong-ty/cong-ty-request.service";
import { CustomerRequestServices } from "src/app/shared/service/request/khach-hang/khach-hang-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: "them-sua-khach-hang",
  templateUrl: "./them-sua-khach-hang.component.html",
  standalone: false,
})
export class ThemSuaKhachHangModal implements OnInit {
  @Input() data: any;
  @Input() mode = 'add'
  companyList: CongTyModel[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private apiCongTy: CompanyRequestServices,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiKhachHang: CustomerRequestServices
  ) {
    this.form = this.fb.group({
      name: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
      phone: [
        "",
        {
          validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
          updateOn: "change",
        },
      ],
      address: [""],
      companyId: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
      userId: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
      status: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
      notes: [""],
    });
  }
  ngOnInit(): void {
    this.getListCompany()
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        companyId: this.data.company ? this.data.company.id : '',
        phone: this.data.phone,
        address: this.data.address,
        userId: this.data.userId ? this.data.userId : '',
        status: this.data.status,
        notes: this.data.notes
      })
      if (this.mode === 'view') {
        this.form.disable()
      }
    }
  } 
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
  }
  getListCompany() {
    this.spinner.show();
    this.apiCongTy
      .getAll()
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.companyList = res.body.result;
        } else {
          this.companyList = [];
        }
      })
      .catch(() => (this.companyList = []))
      .finally(() => this.spinner.hide());
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
      this.apiKhachHang.create(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thêm mới khách hàng thành công')
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
      this.apiKhachHang.update(payload).then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thay đổi thông tin khách hàng thành công')
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
}