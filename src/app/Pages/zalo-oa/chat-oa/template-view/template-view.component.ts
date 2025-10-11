import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ZaloOARequestServices } from "src/app/shared/service/request/zalo-oa/zalo-oa-request.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: 'template-view',
  templateUrl: './template-view.component.html',
  standalone: false,
})
export class TemplateViewModal implements OnInit{
  @Input() data: any
  @Input() customerId: any;
  @Input() userId: any;
  templateData: any
  listButton: any[] = []
  listTable: any[] = []
  constructor(
    private modal: NgbModal,
    private apiZalo: ZaloOARequestServices,
    private spinner: SpinnerService,
    private toast: ToastService
  ) { }
  ngOnInit(): void {
    this.getTemplate()
  }
  getTemplate() {
    this.spinner.show()
    const params = {
      customerId: this.customerId,
      templateId: this.data.id
    }
    this.apiZalo.renderTemplate(params).then((res: any) => {
      if (res && res.code === 200) {
        if (this.data.type !== 1) {
          const data = '{' + res.result + '}'
          this.templateData = JSON.parse(data)
        } else {
          this.templateData = res.result
        }
      } else {
        this.data = null
      } 
    }).catch((err) => {
    })
    .finally(() => this.spinner.hide())
  }
  sendMessage() {
    let payload: any
    if (this.data.type === 1) {
      payload = {
        recipient: {
          user_id: this.userId,
        },
        message: {
          text: this.templateData,
        },
      };
      this.apiZalo.messageText(payload).then((res: any) => {
        if (res && res.error === 0) {
          this.closeModal(true)
        }
      })
    } else {
      payload = {
        recipient: {
          user_id: this.userId,
        },
        message: {
          ...this.templateData
        }
      }
      if (this.data.type === 2) {
        this.apiZalo.messageTemplate(payload, 'transaction').then((res: any) => {
          if (res && res.error === 0) {
            this.closeModal(true)
          } else {
            this.toast.error(res.message)
          }
        })
      } else {
        this.apiZalo.messageTemplate(payload, "promotion").then((res: any) => {
          if (res && res.error === 0) {
            this.closeModal(true);
          } else {
            this.toast.error(res.message);
          }
        });
      }
    }
  }
  closeModal(isReturn = false) {
    this.modal.dismissAll(isReturn);
  }
}