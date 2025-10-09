import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ViewImageModal } from "src/app/Layout/Components/common/view-image/view-image.component";
import { ZaloOARequestServices } from "src/app/shared/service/request/zalo-oa/zalo-oa-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ApiZaloOAServices } from "src/app/shared/service/zalo-api.services";

@Component({
  selector: "zalo-oa",
  templateUrl: "./zalo-oa.component.html",
  styleUrls: ["zalo-oa.component.scss"],
  standalone: false,
})
export class ZaloOAComponent implements OnInit {
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
  private http: HttpClient;
  constructor(
    public svShare: ShareService,
    private apiZalo: ZaloOARequestServices,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.route.queryParams.subscribe((param: any) => {
      if (param && param.id) {
        this.customerId = param.id;
      }
    });
  }
  ngOnInit(): void {
    if (this.customerId) {
      this.getConversation();
    }
  }
  getConversation() {
    const params = {
      // user_id: this.customerId,
      user_id: "8981838908298308976",
      offset: 0,
      count: 10,
    };
    this.apiZalo.getConversation(params.user_id).then((res: any) => {
      if (res && res.data && res.data.length) {
        this.messengerList = this.convertZaloToMessengerList(res);
      }
    });
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
}