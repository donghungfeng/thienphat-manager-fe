import { Component } from "@angular/core";
import { NgbModal, NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThongTinIssueModal } from "./thong-tin-issue/thong-tin-issue.component";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { HttpResponse } from "@angular/common/http";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";
import { IssueModel } from "src/app/shared/model/issue/issue.model";
import { XemCommentIssueDrawer } from "./xem-comment-issue/xem-comment-issue.component";
import moment from "moment";

@Component({
  selector: "issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["issue.component.scss"],
  standalone: false,
})
export class IssueComponent {
  page = 1;
  size = 10;
  totalItems = 0;
  createDate: any;
  updatedDate: any;
  code: any;
  createName: any;
  assignName: any;
  resolveDate: any;
  dueDate: any;
  estimate: any;
  title: any;
  description: any;
  url: any;
  type: any;
  priority: any;
  status: any;
  note: any;
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
  listDatas: any[] = [];
  selectedEntity: any;
  typeView = "grid";
  selected = {
    startDate: moment().startOf("months"),
    endDate: moment().endOf("months"),
  };
  numberOfDate: any;
  constructor(
    private modalService: NgbModal,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiService: IssueRequestServices,
    private drawerService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.getListDataByFilter();
  }
  getListDataByFilter() {
    const filterString = () => {
      let filter = [];
      filter.push("id>0");
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
        filter.push(`create.fullName==*${this.createName}*`);
      }
      if (this.assignName) {
        filter.push(`assign.fullName==*${this.assignName}*`);
      }
      if (this.resolveDate) {
        filter.push(`resolveDate==${this.resolveDate}`);
      }
      if (this.dueDate) {
        filter.push(`dueDate==${this.dueDate}`);
      }
      if (this.resolveDate) {
        filter.push(`resolveDate==${this.resolveDate}`);
      }
      if (this.estimate) {
        filter.push(`estimate==${this.estimate}`);
      }
      if (this.title) {
        filter.push(`title==*${this.title}*`);
      }
      if (this.url) {
        filter.push(`url==*${this.url}*`);
      }
      if (this.type) {
        filter.push(`type==${this.type}`);
      }
      if (this.priority) {
        filter.push(`priority==${this.priority}`);
      }
      if (this.status) {
        filter.push(`status==${this.status}`);
      }
      if (this.note) {
        filter.push(`note==*${this.note}*`);
      }
      return filter.join(";");
    };
    const params = {
      page: this.page - 1,
      size: this.size,
      filter: filterString(),
      sort: ["id", "desc"],
    };
    this.spinner.show();
    this.apiService
      .search(params)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.listDatas = [];
          if (this.typeView === "list") {
            this.formatDataWithListLayout(res.body.result.content);
          } else {
            this.formatDataWithGridLayout(res.body.result.content);
          }
          this.totalItems = res.body.result.totalElements;
        } else {
          this.listDatas = [];
          this.totalItems = 0;
        }
      })
      .catch(() => {
        this.toast.error("Có lỗi trong khi tải dữ liệu");
      })
      .finally(() => {
        this.spinner.hide();
      });
  }
  handleFilter() {
    this.page = 1;
    this.getListDataByFilter();
  }
  resetData() {
    this.getListDataByFilter();
  }

  changePage(event: any) {
    this.page = event;
    this.getListDataByFilter();
  }

  selectRow(item = null) {
    this.selectedEntity = item;
  }

  detailModal(data = null) {
    const drawer = this.drawerService.open(XemCommentIssueDrawer, {
      ariaLabelledBy: "offcanvas-basic-title",
      keyboard: false,
      // backdrop: "static",
      position: "end",
      panelClass: "drawer-lg",
    });
    drawer.componentInstance.data = data;
  }

  addEditComany(data = null, mode = "add") {
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
          this.page = 1;
          this.getListDataByFilter();
        }
      });
    } else {
      const modal = this.modalService.open(ThongTinIssueModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.componentInstance.data = data;
      modal.componentInstance.mode = mode;
      modal.result.then((result) => {
        if (result) {
          this.getListDataByFilter();
        }
      });
    }
  }

  getRowClass(item: any): string {
    if (item) {
      if (this.selectedEntity && this.selectedEntity.id === item.id)
        return "table-primary";
      if (this.getDistanceDueDate(item.dueDate) < -24) return "table-danger";
      if (this.getDistanceDueDate(item.dueDate) <= 0) return "table-warning";
    }
    return "fw-light";
  }
  getDistanceDueDate(dateString: string): any {
    const [year, month, day] = dateString.split("-").map(Number);
    const due = new Date(year, month - 1, day);
    return (due.getTime() - new Date().getTime()) / 3600000;
  }
  changeTypeView(type) {
    this.typeView = type;
    this.getListDataByFilter()
  }
  getDayList() {
    const dates: moment.Moment[] = [];
    const current = this.selected.startDate.clone();
    while (current.isSameOrBefore(this.selected.endDate, "day")) {
      dates.push(current.clone());
      current.add(1, "day");
    }
    const result = dates.map((d) => ({
      date: d.format("DD"),
      month: "tháng " + d.format("MM"),
      fullDate: d.format('DD/MM/YYYY')
    }));
    return result;
  }
  formatDataWithGridLayout(data: any[]) {
    const result = {};
    const dateList: any[] = this.getDayList();
    data.forEach((item) => {
      if (item.assign) {
        const assigneeId = item.assign.id;
        const date = moment(item.dueDate, 'DD/MM/YYYY').format("DD/MM/YYYY");
        if (!result[assigneeId]) result[assigneeId] = {
          fullName: item.assign.fullName,
        };
        if (result[assigneeId]) {
          dateList.forEach((d) => {
            if (!result[assigneeId][d.fullDate]) result[assigneeId][d.fullDate] = [];
          });
        }
        if (result[assigneeId][date]) {
          result[assigneeId][date].push(item);
        }
      }
    });
    Object.keys(result).forEach(rs => {
      const body = {
        id: +rs,
        fullName: result[rs]['fullName'],
        datas: Object.keys(result[rs]).map(el => {
          if (el !== 'fullName') {
            return result[rs][el]
          }
        }).filter(Boolean)
      }
      this.listDatas.push(body)
    })
  }
  formatDataWithListLayout(data: any[]) {
    let rs = {};
    data.forEach((item: IssueModel) => {
      if (!rs.hasOwnProperty(item.status)) {
        rs[item.status] = [
          {
            ...item,
            statusName: this.svShare.getStatusNameIssue(item.status),
          },
        ];
      } else {
        rs[item.status].push({
          ...item,
          statusName: this.svShare.getStatusNameIssue(item.status),
        });
      }
    });
    Object.keys(rs).forEach((item: any) => {
      this.listDatas.push({
        statusName: this.svShare.getStatusNameIssue(+item),
        datas: rs[item],
      });
    });
  }
  changeDate() {
    this.page = 1
    this.getListDataByFilter()
  }
}