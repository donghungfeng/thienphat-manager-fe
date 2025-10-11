import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ViewImageModal } from "src/app/Layout/Components/common/view-image/view-image.component";
import { KhachHangModel } from "src/app/shared/model/khach-hang/khach-hang.model";
import { ZaloOaQuoteModel } from "src/app/shared/model/zalo-oa/zalo-oa.model";
import { CustomerRequestServices } from "src/app/shared/service/request/khach-hang/khach-hang-request.service";
import { ZaloOARequestServices } from "src/app/shared/service/request/zalo-oa/zalo-oa-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { ApiZaloOAServices } from "src/app/shared/service/zalo-api.services";
import { TemplateViewModal } from "./template-view/template-view.component";

@Component({
  selector: "zalo-oa",
  templateUrl: "./zalo-oa.component.html",
  styleUrls: ["zalo-oa.component.scss"],
  standalone: false,
})
export class ZaloOAComponent implements OnInit, OnDestroy {
  listTemplate: any[] = [
    {
      templateName: "Mẫu 1",
      templateTypeName: "Loại mẫu 1",
      content:
        "Xin chào [Tên khách hàng], <br/>Mình là [Tên bạn] từ [Công ty]. Cảm ơn anh/chị đã quan tâm. Mình có thể hỗ trợ tư vấn về [vấnđề/sản phẩm] vào [ngày giờ] không ạ? Nếu được, anh/chị trả lời “OK” hoặc chọn khung giờ phù hợp.",
    },
    {
      templateName: "Mẫu 1",
      templateTypeName: "Loại mẫu 1",
      content:
        "Xin chào [Tên khách hàng], <br/>Mình là [Tên bạn] từ [Công ty]. Cảm ơn anh/chị đã quan tâm. Mình có thể hỗ trợ tư vấn về [vấnđề/sản phẩm] vào [ngày giờ] không ạ? Nếu được, anh/chị trả lời “OK” hoặc chọn khung giờ phù hợp.",
    },
    {
      templateName: "Mẫu 1",
      templateTypeName: "Loại mẫu 1",
      content:
        "Xin chào [Tên khách hàng], <br/>Mình là [Tên bạn] từ [Công ty]. Cảm ơn anh/chị đã quan tâm. Mình có thể hỗ trợ tư vấn về [vấnđề/sản phẩm] vào [ngày giờ] không ạ? Nếu được, anh/chị trả lời “OK” hoặc chọn khung giờ phù hợp.",
    },
    {
      templateName: "Mẫu 1",
      templateTypeName: "Loại mẫu 1",
      content:
        "Xin chào [Tên khách hàng], <br/>Mình là [Tên bạn] từ [Công ty]. Cảm ơn anh/chị đã quan tâm. Mình có thể hỗ trợ tư vấn về [vấnđề/sản phẩm] vào [ngày giờ] không ạ? Nếu được, anh/chị trả lời “OK” hoặc chọn khung giờ phù hợp.",
    },
    {
      templateName: "Mẫu 1",
      templateTypeName: "Loại mẫu 1",
      content:
        "Xin chào [Tên khách hàng], <br/>Mình là [Tên bạn] từ [Công ty]. Cảm ơn anh/chị đã quan tâm. Mình có thể hỗ trợ tư vấn về [vấnđề/sản phẩm] vào [ngày giờ] không ạ? Nếu được, anh/chị trả lời “OK” hoặc chọn khung giờ phù hợp.",
    },
  ];
  messengerList: any[] = [];
  customerId: any;
  customerDetail: KhachHangModel | null = null;
  zaloUserId: any;
  message: any;
  zaloQuota: ZaloOaQuoteModel = new ZaloOaQuoteModel();
  isShowQuote = false;
  intervalId: any;
  private http: HttpClient;
  constructor(
    public svShare: ShareService,
    private apiZalo: ZaloOARequestServices,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private apiCustomer: CustomerRequestServices,
    private spinner: SpinnerService,
    private toast: ToastService,
  ) {
    this.route.queryParams.subscribe((param: any) => {
      if (param && param.id) {
        this.customerId = param.id;
      }
    });
  }
  ngOnInit(): void {
    this.getListTemplate()
    if (this.customerId) {
      this.getDetailCustomer();
    }
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  getConversation(userId) {
    const params = {
      user_id: userId,
      // user_id: "8981838908298308976",
      offset: 0,
      count: 10,
    };
    this.apiZalo
      .getConversation(params.user_id)
      .then((res: any) => {
        if (res && res.data && res.data.length) {
          this.messengerList = this.convertZaloToMessengerList(res);
          // setTimeout(() => {
          //   this.getConversation(userId);
          // }, 1500)
        }
      })
      .catch((err) => {});
  }
  convertZaloToMessengerList(zaloData: any): any[] {
    if (!zaloData || !Array.isArray(zaloData.data)) return [];

    const messages = zaloData.data
      .filter((item) => item.type === "text" || item.type === "photo")
      .sort((a, b) => a.time - b.time);

    const messengerList: any[] = [];
    let currentGroup: any = null;

    for (const msg of messages) {
      const type = msg.src;
      const time = msg.sent_time;
      const avatar = msg.src === 1 ? msg.from_avatar : msg.to_avatar;
      const displayName =
        msg.src === 1 ? msg.from_display_name : msg.to_display_name;
      const content = {
        type: msg.type,
        message: msg.type === "photo" ? msg.url : msg.message,
        time: msg.sent_time,
      };
      if (currentGroup && currentGroup.type === type) {
        currentGroup.contents.push(content);
        currentGroup.time = msg.sent_time;
      } else {
        if (currentGroup) messengerList.push(currentGroup);
        currentGroup = {
          displayName,
          avatar,
          type,
          time: msg.sent_time,
          contents: [content],
        };
      }
    }
    if (currentGroup) messengerList.push(currentGroup);

    return messengerList;
  }
  viewImage(src: any) {
    const modal = this.modalService.open(ViewImageModal, {
      centered: true,
      windowClass: "modal-auto-size",
    });
    modal.componentInstance.src = src;
  }
  getDetailCustomer() {
    this.spinner.show();
    if (this.customerId) {
      this.apiCustomer
        .detail(this.customerId)
        .then((res: any) => {
          if (res && res.body && res.body.code === 200) {
            this.customerDetail = res.body.result;
            this.zaloUserId = this.customerDetail.userId;
            this.intervalId = setInterval(() => {
              this.getConversation(this.zaloUserId);
            }, 5000);
            this.getQuota();
          } else {
            this.customerDetail = null;
          }
        })
        .finally(() => {
          this.spinner.hide();
        });
    }
  }
  sendMessageText() {
    const payload = {
      recipient: {
        user_id: this.zaloUserId,
      },
      message: {
        text: this.message,
      },
    };
    this.apiZalo.messageText(payload).then((res: any) => {
      if (res && res.message && res.message === "Success") {
        this.message = null;
        this.getConversation(this.zaloUserId);
      }
    });
  }
  getQuota() {
    const payload = {
      user_id: this.zaloUserId,
    };
    this.apiZalo.getQuota(payload).then((res: any) => {
      if (res && res.message && res.message === "Success") {
        this.zaloQuota = res.data;
        if (
          this.zaloQuota &&
          (this.zaloQuota.promotion.daily_remain ||
            this.zaloQuota.promotion.daily_total ||
            this.zaloQuota.promotion.monthly_remain ||
            this.zaloQuota.promotion.monthly_total)
        ) {
          this.isShowQuote = true;
        }
      }
    });
  }
  getStringQuote() {
    let str = "";
    if (this.zaloQuota.promotion.daily_remain) {
      str += `Bạn còn ${this.zaloQuota.promotion.daily_remain} số lượt gửi tin truyền thông còn lại trong ngày. `;
    }
    if (this.zaloQuota.promotion.monthly_remain) {
      str += `Bạn còn ${this.zaloQuota.promotion.monthly_remain} số lượt gửi tin truyền thông còn lại trong tháng này.`;
    }
    return str;
  }
  getListTemplate() {
    const filterString = () => {
      let filter = [];
      filter.push("id>0");
      return filter.join(";");
    };
    const params = {
      page: 0,
      size: 10,
      filter: filterString(),
      sort: ["id", "desc"],
    };
    this.spinner.show();
    this.apiZalo
      .search(params)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.listTemplate = res.body.result.content;
          // this.totalItems = res.body.result.totalElements;
        } else {
          // this.listDatas = [];
          // this.totalItems = 0;
        }
      })
      .catch(() => {
        this.toast.error("Có lỗi trong khi tải dữ liệu");
      })
      .finally(() => {
        this.spinner.hide();
      });
  }
  openTemplateView(template: any) {
    const modal = this.modalService.open(TemplateViewModal, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    modal.componentInstance.data = template;
    modal.componentInstance.customerId = this.customerId;
    modal.componentInstance.userId = this.zaloUserId;
    modal.result.then((rs: any) => {
      if (rs) {
        this.getConversation(this.zaloUserId)
      }
    })
  }
}