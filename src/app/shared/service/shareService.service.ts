import { Injectable } from "@angular/core";
import { LOG_WORK_STATUS, STATUS } from "../common/constant";

@Injectable({ providedIn: "root" })
export class ShareService {
  getColorStatusByCode(statusCode: any) {
    switch (statusCode) {
      case STATUS.COMPLETED:
        return "btn-status-success";
      case STATUS.CANCELED:
        return "btn-status-danger";
      case STATUS.IN_PROGRESS:
        return "btn-status-warning";
      case STATUS.ON_HOLD:
        return "btn-status-primary";
      default:
        return "btn-status-primary";
    }
  }
  getStatusNameByCode(statusCode: any) {
    switch (statusCode) {
      case STATUS.COMPLETED:
        return "Completed";
      case STATUS.CANCELED:
        return "Canceled";
      case STATUS.IN_PROGRESS:
        return "In progress";
      case STATUS.ON_HOLD:
        return "On hold";
      default:
        return "On hold";
    }
  }
  getColorStatusLogWorkByCode(statusCode: any) {
    switch (statusCode) {
      case LOG_WORK_STATUS.VALID:
        return "btn-status-success";
      case LOG_WORK_STATUS.INVALID:
        return "btn-status-danger";
      case LOG_WORK_STATUS.EXPLANATION:
        return "btn-status-warning";
      default:
        return "btn-status-primary";
    }
  }
  getStatusLogWorkNamByCode(statusCode: any) {
    switch (statusCode) {
      case LOG_WORK_STATUS.VALID:
        return "Hợp lệ";
      case LOG_WORK_STATUS.INVALID:
        return "Không hợp lệ";
      case LOG_WORK_STATUS.EXPLANATION:
        return "Đã gửi giải trình";
      default:
        return "Hợp lệ";
    }
  }
  getStatusNameCommonByCode(statusCode: any) {
    switch (statusCode) {
      case 1:
        return "Hoạt động";
      case 2:
        return "Không hoạt động";
      default:
        return "Hoạt động";
    }
  }
  getColorStatusCommonByCode(statusCode: any) {
    switch (statusCode) {
      case 1:
        return "btn-status-success";
      case 2:
        return "btn-status-danger";
      default:
        return "btn-status-success";
    }
  }

  getStatusNameIssue(staus: any) {
    switch (staus) {
      case 0:
        return "Đã tạo"; // Đã tạo
      case 1:
        return "Đã giao"; // Đã giao
      case 2:
        return "Đang xử lý"; // Đang xử lý
      case 3:
        return "Đã hoàn thành"; // Đã hoàn thành
      case 4:
        return "Đã đóng"; // Đã đóng
      default:
        return "btn-secondary";
    }
  }

  getColorStatusNameIssue(staus: any) {
    switch (staus) {
      case 0:
        return "btn-secondary"; // Đã tạo
      case 1:
        return "btn-info"; // Đã giao
      case 2:
        return "btn-warning"; // Đang xử lý
      case 3:
        return "btn-success"; // Đã hoàn thành
      case 4:
        return "btn-danger"; // Đã đóng
      default:
        return "btn-secondary";
    }
  }

  getPriorityIssue(priority: any) {
    switch (priority) {
      case 1:
        return "Thấp"; // Thấp
      case 2:
        return "Trung bình"; // Trung bình
      case 3:
        return "Cao"; // Cao
      default:
        return "btn-secondary";
    }
  }

  getColorPriorityIssue(priority: any) {
    switch (priority) {
      case 1:
        return "btn-success"; // Thấp
      case 2:
        return "btn-warning"; // Trung bình
      case 3:
        return "btn-danger"; // Cao
      default:
        return "btn-secondary";
    }
  }
}