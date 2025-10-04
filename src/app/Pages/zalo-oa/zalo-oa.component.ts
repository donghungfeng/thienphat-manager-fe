import { Component } from "@angular/core";

@Component({
  selector: "zalo-oa",
  templateUrl: "./zalo-oa.component.html",
  styleUrls: ["zalo-oa.component.scss"],
  standalone: false,
})
export class ZaloOAComponent {
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
  messengerList: any[] = [
    {
      type: 1,
      time: "20:53",
      contents: [
        "Chào bạn, bên mình muốn hỏi về tiến độ triển khai website đến đâu rồi?",
      ],
    },
    {
      type: 2,
      time: "20:53",
      contents: [
        "Chào anh/chị, hiện tại team đã hoàn thành 70% giao diện và đang tích hợp tính năng giỏ hàng. Dự kiến cuối tuần này sẽ có bản demo để anh/chị xem trước.",
      ],
    },
    {
      type: 1,
      time: "20:53",
      contents: [
        "Ok, vậy bản demo có bao gồm phần thanh toán online chưa?",
        "Nếu thanh toán tôi có thể thanh toán như nào?",
      ],
    },
    {
      type: 2,
      time: "20:53",
      contents: [
        "Bản demo đầu tiên sẽ có giao diện thanh toán, nhưng chức năng kết nối cổng thanh toán sẽ hoàn thiện ở giai đoạn tiếp theo, khoảng giữa tuần sau ạ.",
      ],
    },
    {
      type: 1,
      time: "20:53",
      contents: [
        "Rồi, bên mình muốn review sớm để kịp góp ý. Khi nào có link demo nhớ gửi qua cho tôi nhé.",
      ],
    },
    {
      type: 2,
      time: "20:53",
      contents: [
        "Vâng, chắc chắn rồi ạ. Mình sẽ gửi ngay khi bản demo sẵn sàng, dự kiến chiều thứ Sáu.",
      ],
    },
  ];
}