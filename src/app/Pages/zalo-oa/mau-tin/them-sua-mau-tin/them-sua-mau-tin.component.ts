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
      name: [""],
      status: [""],
      notes: [""],
      description: [""]
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        template_type: this.data.type === 1 ? TYPE_TEMPLATE.TEXT : this.data.type === 2 ? TYPE_TEMPLATE.TRANSACTION_ORDER : TYPE_TEMPLATE.PROMOTION,
        status: this.data.status,
        notes: this.data.note,
      });
      if (this.data.type !== 1) {
        const value = JSON.parse(this.data.value);
        const header = value.message.attachment.payload.elements.find((item: any) => item.type === "header")
        if (header) {
          this.form.patchValue({
            header: header.content,
          });
        }
        const text = value.message.attachment.payload.elements.find((item: any) => item.type === "text")
        if (text) {
          this.form.patchValue({
            text: text.content,
          });
        }
        const buttons = value.message.attachment.payload.buttons
        if (buttons && buttons.length) {
          this.listButton = buttons.map((item: any) => ({
            title: item.title,
            type: item.type,
            payload: {
              url: item.payload.url,
            },
          }))
        }
        const table = value.message.attachment.payload.elements.find((item: any) => item.type === "table")
        if (table && table.content && table.content.length) {
          this.listTable = table.content.map((item: any) => ({
            key: item.key,
            value: item.value,
          }))
        }
      } else {
        const value = JSON.parse(this.data.value);
        if (value.message.text) {
          this.form.patchValue({
            text: value.message.text,
          });
        }
      }
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
      const body: any = {
        value: JSON.stringify(payload),
        name: this.form.value.name,
        type: this.form.value.template_type  === this.typeTemplate.TEXT ? 1 : this.form.value.template_type === this.typeTemplate.TRANSACTION_ORDER ? 2 : 3,
        title: this.form.value.header,
        status: this.form.value.status,
        note: this.form.value.notes,
        description: "",
      };
      this.spinner.show();
      if (!this.data) {
        this.apiZalo.create(body)
          .then((res: any) => {
            if (res.body.code === 200) {
              this.toast.success("Tạo mẫu tin thành công")
              this.closeModal(true)
            } else {
              this.toast.error("Tạo mẫu tin thất bại")
            }
          })
          .finally(() => {
            this.spinner.hide();
          });
      } else {
        body.id = this.data.id
        this.apiZalo.update(body)
          .then((res: any) => {
            if (res.body.code === 200) {
              this.toast.success("Cập nhật mẫu tin thành công")
              this.closeModal(true)
            } else {
              this.toast.error("Cập nhật mẫu tin thất bại")
            }
          })
          .finally(() => {
            this.spinner.hide();
          })
      }
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
      if (this.listButton.some((item) => !item.title || !item.payload.url)) {
        this.toast.warning("Vui lòng nhập đầy đủ thông tin nút");
        return;
      }
      if (this.listTable.some((item) => !item.key.includes("Mã"))) {
        this.toast.warning("Bảng phải có ít nhất 1 dòng với Key là 'Mã...'");
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
      if (this.form.value.template_type === TYPE_TEMPLATE.PROMOTION) {
        const currentHour = new Date().getHours();
        if (currentHour >= 22 || currentHour < 6) {
          this.toast.warning(
            "Mẫu tin truyền thông không thể gửi vào khung giờ từ 22:00 - 06:00"
          );
          return;
        }
      }
      if (this.listButton.some((item) => !/^https?:\/\/.+/.test(item.payload.url))) {
        this.toast.warning("Link không đúng định dạng");
        return;
      }
      const body: any = {
        value: JSON.stringify(payload),
        name: this.form.value.name,
        type: this.form.value.template_type  === this.typeTemplate.TEXT ? 1 : this.form.value.template_type === this.typeTemplate.TRANSACTION_ORDER ? 2 : 3,
        title: this.form.value.header,
        status: this.form.value.status,
        note: this.form.value.notes,
        description: "",
      };
      this.spinner.show();
      if (!this.data) {
        this.apiZalo.create(body)
          .then((res: any) => {
            if (res.body.code === 200) {
              this.toast.success("Tạo mẫu tin thành công")
              this.closeModal(true)
            } else {
              this.toast.error("Tạo mẫu tin thất bại")
            }
          })
          .finally(() => {
            this.spinner.hide();
          });
      } else {
        body.id = this.data.id
        this.apiZalo.update(body)
          .then((res: any) => {
            if (res.body.code === 200) {
              this.toast.success("Cập nhật mẫu tin thành công")
              this.closeModal(true)
            } else {
              this.toast.error("Cập nhật mẫu tin thất bại")
            }
          })
          .finally(() => {
            this.spinner.hide();
          })
      }
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