import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { KhachHangModel } from "src/app/shared/model/khach-hang/khach-hang.model";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: "them-sua-chien-dich",
  templateUrl: "./them-sua-chien-dich.component.html",
  styleUrls: ["./them-sua-chien-dich.component.scss"],
  standalone: false,
})
export class ThemSuaChienDichComponent {
  @Input() data: any;
  @Input() mode = "add";
  form: FormGroup;
  customerList: KhachHangModel[] = []
  
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
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
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
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
  }
}