import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThongTinIssueModal } from "./thong-tin-issue/thong-tin-issue.component";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { HttpResponse } from "@angular/common/http";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";

@Component({
  selector: "issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["issue.component.scss"],
  standalone: false,
})
export class IssueComponent {
  page = 1
  size = 10
  totalItems = 0
  username: any
  date:any
  reason:any
  factoryName: any
  status: any
  note: any
  headers: any[] = [
    {
      name: "STT",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Ngày",
      key: "date",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Username",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Giờ vào",
      key: "phone",
      class: "",
      style: "width: 150px",
    },
    {
      name: "Giờ ra",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Vào muộn (phút)",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Về sớm (phút)",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Giải trình",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Trạng thái",
      key: "address",
      class: "",
      style: "width: 350px",
    },
  ];
  listDatas: any[] = [];
  constructor(
    private modalService: NgbModal, 
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiService: IssueRequestServices,
  ) {}

  ngOnInit(): void {
    this.getListDataByFilter()
  }

  getListDataByFilter() {
    const filterString = () => {
      let filter = []
      filter.push("id>0")
      if (this.username) {
        filter.push(`username==*${this.username}*`);
      }
      if (this.date) {
        filter.push(`date>${this.date}`);
      }
      if (this.reason) {
        filter.push(`reason==*${this.reason}*`);
      }
      if (this.note) {
        filter.push(`note==*${this.note}*`);
      }
      if (this.status) {
        filter.push(`status==${this.status}`);
      }
      return filter.join(";")
    }
    const params = {
      page: this.page - 1,
      size: this.size,
      filter: filterString(),
      sort: ["id", "desc"],
    };
    this.spinner.show()
    this.apiService.search(params).then((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.listDatas = res.body.result.content
        this.totalItems = res.body.result.totalElements
      } else {
        this.listDatas = [];
        this.totalItems = 0
      }
    })
    .catch(() => {
      this.toast.error('Có lỗi trong khi tải dữ liệu')
    })
    .finally(() => {
      this.spinner.hide()
    })
  }
  handleFilter() {
    this.page = 1
    this.getListDataByFilter()
  }
  resetData() {
    this.getListDataByFilter()
  }

  changePage(event: any) {
    this.page = event
    this.getListDataByFilter()
  }

  
  detailModal(data = null) {
    const modal = this.modalService.open(ThongTinIssueModal, {
      centered: true,
      size: "xl",
      backdrop: "static",
      keyboard: false,
    });
    modal.componentInstance.data = data;
    modal.result.then((result) => {});
  }
}