import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ViewImageModal } from "src/app/Layout/Components/common/view-image/view-image.component";
import { TYPE_TEMPLATE, TYPE_TEMPLATE_LIST } from "src/app/shared/common/constant";
import { ZaloOARequestServices } from "src/app/shared/service/request/zalo-oa/zalo-oa-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: "them-sua-mau-tin",
  templateUrl: "./them-sua-mau-tin.component.html",
  standalone: false,
  styleUrls: ["them-sua-mau-tin.component.scss"],
})
export class ThemSuaMauTinComponent {
  @Input() data: any;
  @Input() mode = "add";
  form: FormGroup;
  templateTypeList: any[] = TYPE_TEMPLATE_LIST;
  typeTemplate = TYPE_TEMPLATE;
  attachmentImagePreview: any;
  listTable: any[] = [
    {
      key: "",
      value: "",
    },
  ];
  listButton: any[] = [
    {
      title: "",
      type: "oa.open.url",
      payload: {
        url: "",
      },
    },
  ];
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private modalService: NgbModal,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiZalo: ZaloOARequestServices
  ) {
    this.form = this.fb.group({
      user_id: ["2767099476104131763"],
      template_type: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
      text: [""],
      attachment_id: [""],
      header: [""],
      phone: [
        "",
        // {
        //   validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
        //   updateOn: "change",
        // },
      ],
      address: [""],
      companyId: [
        "",
        // {
        //   validators: [Validators.required],
        //   updateOn: "change",
        // },
      ],
      userId: [
        "",
        // {
        //   validators: [Validators.required],
        //   updateOn: "change",
        // },
      ],
      status: [
        "",
        // {
        //   validators: [Validators.required],
        //   updateOn: "change",
        // },
      ],
      notes: [""],
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        companyId: this.data.company ? this.data.company.id : "",
        phone: this.data.phone,
        address: this.data.address,
        userId: this.data.userId ? this.data.userId : "",
        status: this.data.status,
        notes: this.data.notes,
      });
      if (this.mode === "view") {
        this.form.disable();
      }
    }
  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
  }
  submitForm() {
    let payload: any;
    if (this.form.value.template_type === TYPE_TEMPLATE.TEXT) {
      if (!this.form.value.text) {
        this.toast.warning("Vui lòng nhập nội dung tin nhắn");
        return;
      }
      payload = {
        recipient: {
          user_id: this.form.value.user_id,
        },
        message: {
          text: this.form.value.text,
        },
      };
      this.spinner.show();
      this.apiZalo
        .messageText(payload)
        .then((res: any) => {
          if (res.error === 0 && res.message === "Success") {
            this.toast.success("Gửi mẫu tin thành công");
            this.closeModal(true);
          }
        })
        .finally(() => {
          this.spinner.hide();
        });
    } else {
      if (!this.form.value.attachment_id) {
        this.toast.warning("Vui lòng chọn ảnh bìa");
        return;
      }
      if (!this.form.value.header) {
        this.toast.warning("Vui lòng nhập tiêu đề");
        return;
      }
      if (!this.form.value.text) {
        this.toast.warning("Vui lòng nhập nội dung tin nhắn");
        return;
      }
      if (this.listTable.some((item) => !item.key || !item.value)) {
        this.toast.warning("Vui lòng nhập đầy đủ thông tin bảng");
        return;
      }
      payload = {
        recipient: {
          user_id: this.form.value.user_id,
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: this.form.value.template_type,
              elements: [
                {
                  attachment_id: this.form.value.attachment_id,
                  type: "banner",
                },
                {
                  type: "header",
                  content: this.form.value.header,
                },
                {
                  type: "text",
                  align: "left",
                  content: this.form.value.text ? this.form.value.text : "",
                },
                {
                  type: "table",
                  content: this.listTable.map((item: any) => ({
                    ...item,
                  })),
                },
              ],
              buttons: this.listButton.map((item: any) => ({
                ...item,
                image_icon: "default",
              })),
            },
          },
        },
      };
      const type =
        this.form.value.template_type === TYPE_TEMPLATE.PROMOTION
          ? "promotion"
          : "transaction";
      this.spinner.show();
      this.apiZalo
        .messageTemplate(payload, type)
        .then((res: any) => {
          if (res.error === 0 && res.message === "Success") {
            this.toast.success("Gửi mẫu tin thành công");
            this.closeModal(true);
          }
        })
        .finally(() => {
          this.spinner.hide();
        });
    }
  }
  onFileChange(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      this.spinner.show();
      this.apiZalo
        .uploadImage(file)
        .then((res: any) => {
          if (res.error === 0 && res.message === "Success") {
            this.form.patchValue({
              attachment_id: res.data.attachment_id,
            });
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;
              this.attachmentImagePreview = base64String;
            };
            reader.readAsDataURL(file);
          }
        })
        .finally(() => this.spinner.hide());
    }
  }
  previewImage(src: any) {
    const modal: NgbModalRef = this.modalService.open(ViewImageModal, {
      centered: true,
      windowClass: "modal-auto-size",
    });
    modal.componentInstance.src = src;
  }
  onTemplateTypeChange(event: any) {
    this.form.patchValue({
      template_type: event.target.value,
    });
    this.form.patchValue({
      text: "",
      attachment_id: "",
      header: "",
    });
    this.attachmentImagePreview = null;
    this.listTable = [
      {
        key: "",
        value: "",
      },
    ];
    this.listButton = [
      {
        title: "",
        type: "oa.open.url",
        payload: {
          url: "",
        },
      },
    ];
  }
  addNewTable() {
    this.listTable.push({
      key: "",
      value: "",
    });
  }
  addNewButton() {
    this.listButton.push({
      title: "",
      type: "oa.open.url",
      payload: {
        url: "",
      },
    });
  }
}