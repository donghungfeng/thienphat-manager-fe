import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThongTinIssueModal } from "./thong-tin-issue/thong-tin-issue.component";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { HttpResponse } from "@angular/common/http";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";
import { IssueModel } from "src/app/shared/model/issue/issue.model";

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
  createDate: any
  updatedDate: any
  code: any
  createName: any
  assignName: any
  resolveDate: any
  dueDate: any
  estimate: any
  title: any
  description: any
  url: any
  type: any
  priority: any
  status: any
  note: any
  headers: any[] = [
    {
      name: "STT",
      key: "id",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Code",
      key: "code",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Người thực hiện",
      key: "assignName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Người tạo",
      key: "createName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Thời gian tạo",
      key: "createDate",
      class: "",
      style: "width: 350px",
    },
    // {
    //   name: "Thời gian cập nhật",
    //   key: "updatedDate",
    //   class: "",
    //   style: "width: 450px",
    // },
    {
      name: "Thời hạn",
      key: "dueDate",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Số giờ",
      key: "estimate",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tiêu đề",
      key: "title",
      class: "",
      style: "width: 350px",
    },
    {
      name: "url",
      key: "url",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Loại",
      key: "type",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Độ ưu tiên",
      key: "priority",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Trạng thái",
      key: "status",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Ghi chú",
      key: "note",
      class: "",
      style: "width: 350px",
    },
  ];
  listDatas: IssueModel[] = [];
  constructor(
    private modalService: NgbModal,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiService: IssueRequestServices,
  ) { }

  ngOnInit(): void {
    this.getListDataByFilter()
  }

  getListDataByFilter() {
    const filterString = () => {
      let filter = []
      filter.push("id>0")
      if (this.createDate) {
        filter.push(`createdDate==${this.createDate}`);
      }
      if (this.updatedDate) {
        filter.push(`updatedDate==${this.updatedDate}`);
      }
      if (this.code) {
        filter.push(`code==*${this.code}*`);
      }
      if (this.createName) {
        filter.push(`create.fullName==*${this.createName}*`)
      }
      if (this.assignName) {
        filter.push(`assign.fullName==*${this.assignName}*`);
      }
      if (this.resolveDate) {
        filter.push(`resolveDate==${this.resolveDate}`);
      }
      if (this.dueDate) {
        filter.push(`dueDate==${this.dueDate}`)
      }
      if (this.resolveDate) {
        filter.push(`resolveDate==${this.resolveDate}`)
      }
      if (this.estimate) {
        filter.push(`estimate==${this.estimate}`)
      }
      if (this.title) {
        filter.push(`title==*${this.title}*`);
      }
      if (this.url) {
        filter.push(`url==*${this.url}*`);
      }
      if (this.type) {
        filter.push(`type==${this.type}`)
      }
      if (this.priority) {
        filter.push(`priority==${this.priority}`)
      }
      if (this.status) {
        filter.push(`status==${this.status}`)
      }
      if (this.note) {
        filter.push(`note==*${this.note}*`);
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
    modal.result.then((result) => { 
      this.getListDataByFilter();
    });
  }

  addEditComany(data = null, mode = 'add') {
    if (!data) {
      const modal = this.modalService.open(ThongTinIssueModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.componentInstance.mode = mode;
      modal.result.then((result) => {
        if (result) {
          this.page = 1
          this.getListDataByFilter()
        }
      })
    } else {
      const modal = this.modalService.open(ThongTinIssueModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.componentInstance.data = data
      modal.componentInstance.mode = mode
      modal.result.then((result) => {
        if (result) {
          this.getListDataByFilter()
        }
      })
    }
  }
}