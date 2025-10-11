import { HttpResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { WorkRequestServices } from "src/app/shared/service/request/phong-ban/work-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: "thong-tin-cham-cong",
  templateUrl: "./thong-tin-cham-cong.component.html",
  standalone: false,
})
export class ThongTinChamCongModal {
  @Input() data: any;
  departmentList: any[] = [];
  constructor(
    private modal: NgbActiveModal, 
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiService: WorkRequestServices,
  
  ) {
  }
  explanationLogWork(){

    const params = {
      id: this.data.id,
      reason: this.data.reason, 
      status: 5
    };
    this.spinner.show()
    this.apiService.update(params).then((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
          this.toast.success('Gửi giải trình thành công')
          this.closeModal(true)
        } else {
          this.toast.error("Có lỗi xảy ra, vui lòng thử lại");
        }
    })
    .catch(() => {
      this.toast.error('Có lỗi trong khi tải dữ liệu')
    })
    .finally(() => {
      this.spinner.hide()
    })

  }
  closeModal(isReturn = null) {
    this.modal.close(isReturn);
  }
}