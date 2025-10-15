import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NhanVienModel } from "src/app/shared/model/nhan-vien/nhan-vien.model";
import { AuthRequestServices } from "src/app/shared/service/request/auth/auth-request.service";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";

@Component({
  selector: "thong-tin-issue",
  templateUrl: "./thong-tin-issue.component.html",
  standalone: false,
})
export class ThongTinIssueModal implements OnInit {
  @Input() data: any;
  @Input() mode: 'add' | 'edit' | 'view' = 'add';

  form: FormGroup;
  assignList: NhanVienModel[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private toast: ToastService,
    private apiAssign: AuthRequestServices,
    private apiIssue: IssueRequestServices,
    private spinner: SpinnerService,
    public svShare: ShareService,
  ) {
    this.form = this.fb.group({
      code: ["", Validators.required],
      title: ["", Validators.required],
      url: ["", Validators.required],
      assignId: [""],
      dueDate: [null, Validators.required],        // string (dd/MM/yyyy)
      resolveDate: null,    // string (dd/MM/yyyy)
      estimate: ["", Validators.required],
      type: ["", Validators.required],
      priority: ["", Validators.required],
      status: ["", Validators.required],
      note: [""],
      description: [""]
    });
  }

  ngOnInit(): void {
    this.getListAssign();

    // Nếu là sửa hoặc xem, nạp dữ liệu vào form
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        assignId: this.data.assign?.id || '',
        dueDate: this.stringToNgbDate(this.data.dueDate),
        resolveDate: this.stringToNgbDate(this.data.resolveDate)
      });

      this.form.get('code')?.disable();
    }

    // Nếu chỉ xem, disable form
    if (this.mode === 'view') {
      this.form.disable();
    }
  }

  /** 🧭 Lấy danh sách nhân viên assign */
  getListAssign() {
    const params = {
      page: 0,
      size: 100,
      filter: 'status>0',
      sort: ["id", "desc"],
    };
    this.spinner.show();
    this.apiAssign
      .search(params)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.assignList = res.body.result.content || [];
        } else {
          this.assignList = [];
        }
      })
      .catch(() => (this.assignList = []))
      .finally(() => this.spinner.hide());
  }

  /** 🔁 Chuyển "dd/MM/yyyy" -> NgbDateStruct */
  stringToNgbDate(dateStr: string): NgbDateStruct | null {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/").map(Number);
    return { day, month, year };
  }

  /** 🔁 Chuyển NgbDateStruct -> "dd/MM/yyyy" */
  ngbDateToString(date: NgbDateStruct | null): string | null {
    if (!date) return null;
    const day = String(date.day).padStart(2, "0");
    const month = String(date.month).padStart(2, "0");
    return `${day}/${month}/${date.year}`;
  }

  submitForm() {
    const raw = this.form.value;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }

    const payload = {
      ...raw,
      dueDate: this.ngbDateToString(raw.dueDate),
      resolveDate: raw.resolveDate ?  this.ngbDateToString(raw.resolveDate) : null,
    };

    this.spinner.show();

    const request = !this.data
      ? this.apiIssue.create(payload)
      : this.apiIssue.update({ ...payload, id: this.data.id });

    request
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          const msg = !this.data
            ? "Thêm mới Issue thành công"
            : "Cập nhật Issue thành công";
          this.toast.success(msg);

          // ✅ Chỉ close(true) khi submit thành công
          this.closeModal(true);
        } else {
          this.toast.error("Có lỗi xảy ra, vui lòng thử lại");
        }
      })
      .catch((err) => {
        this.toast.error(err?.error?.message || "Có lỗi khi gửi yêu cầu");
      })
      .finally(() => this.spinner.hide());
  }

  closeModal(isReturn: boolean | null = null) {
    this.modal.close(isReturn); // 🔥 Chỉ close, không dismiss
  }
  


}
