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
      case 1:
        return "btn-status-success";
      case 2:
        return "btn-status-danger";
      case 3:
        return "btn-status-warning";
      default:
        return "btn-status-success";
    }
  }
  getStatusLogWorkNamByCode(statusCode: any) {
    switch (statusCode) {
      case 1:
        return "Hợp lệ";
      case 2:
        return "Không hợp lệ";
      case 3:
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
}