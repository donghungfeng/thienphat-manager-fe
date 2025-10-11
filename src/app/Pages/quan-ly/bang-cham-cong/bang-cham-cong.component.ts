import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThongTinChamCongModal } from "./thong-tin-cham-cong/thong-tin-cham-cong.component";
import { GiaiTrinhChamCongModal } from "./giai-trinh-cham-cong/giai-trinh-cham-cong.component";
import { BaoCaoCongViecModal } from "./bao-cao-cong-viec/bao-cao-cong-viec.component";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { HttpResponse } from "@angular/common/http";
import { ApiServices } from "src/app/shared/service/api.services";
import { WorkRequestServices } from "src/app/shared/service/request/phong-ban/work-request.service";
import dayjs, { Dayjs } from 'dayjs';
import { ConfirmModal } from "src/app/Layout/Components/common/cofirm-modal/cofirm-modal.component";
@Component({
  selector: "bang-cham-cong",
  templateUrl: "./bang-cham-cong.component.html",
  styleUrls: ["bang-cham-cong.component.scss"],
  standalone: false,

})
export class BangChamCongComponent {
  page = 1
  size = 10
  totalItems = 0
  username: any
  date: any
  reason: any
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
      style: "width: 200px",
    },
    {
      name: "Username",
      key: "taxNumber",
      class: "",
      style: "width: 200px",
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
      style: "width: 150px",
    },
    {
      name: "Vào muộn (phút)",
      key: "address",
      class: "",
      style: "width: 150px",
    },
    {
      name: "Về sớm (phút)",
      key: "address",
      class: "",
      style: "width: 150px",
    },
    {
      name: "Ghi chú",
      key: "note",
      class: "",
      style: "width: 250px",
    },
    {
      name: "Giải trình",
      key: "address",
      class: "",
      style: "width: 250px",
    },
    {
      name: "Trạng thái",
      key: "address",
      class: "",
      style: "width: 150px",
    }
  ];
  listDatas: any[] = [];
  selectedEntity: any = { id: 0 };

  selectedRangeDate: any;
  invalidDates: Dayjs[] = [];
  ranges: any = {
    'Hôm nay': [dayjs().startOf('day'), dayjs().endOf('day')],
    'Hôm qua': [
      dayjs().subtract(1, 'day').startOf('day'),
      dayjs().subtract(1, 'day').endOf('day'),
    ],
    '7 ngày gần nhất': [
      dayjs().subtract(6, 'days').startOf('day'),
      dayjs().endOf('day'),
    ],
    '30 ngày gần nhất': [
      dayjs().subtract(29, 'days').startOf('day'),
      dayjs().endOf('day'),
    ],
    'Tháng này': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Tháng trước': [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  };
  locale = {
    firstDay: 1,
    startDate: dayjs().startOf('day'),
    endDate: dayjs().endOf('day'),
    format: 'DD/MM/YYYY',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
  };
  tooltips = [
    { date: dayjs(), text: 'Today is just unselectable' },
    { date: dayjs().add(2, 'days'), text: 'Yeeeees!!!' },
  ];

  constructor(
    private modalService: NgbModal,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiService: WorkRequestServices,
  ) {
    this.selectedRangeDate = {
      startDate: dayjs().startOf('day'),
      endDate: dayjs().endOf('day'),
    };

  }

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
      if (this.selectedRangeDate) {
        filter.push(`date>=${this.selectedRangeDate.startDate.format('YYYY-MM-DD')};date<=${this.selectedRangeDate.endDate.format('YYYY-MM-DD')}`);
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

  selectRow(item = null) {
    this.selectedEntity = item;
  }

  changePage(event: any) {
    this.page = event
    this.getListDataByFilter()
  }


  detailLogWorkModal(data = null) {
    const modal = this.modalService.open(ThongTinChamCongModal, {
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
  approveReason(data = null) {
    const modalRef = this.modalService.open(ConfirmModal);
    modalRef.componentInstance.message = 'Delete this item?';

    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          const params = {
            id: this.selectedEntity.id,
            status: 1
          };
          this.spinner.show()
          this.apiService.update(params).then((res: HttpResponse<any>) => {
            if (res.body.code === 200) {
              this.getListDataByFilter();
              this.toast.success('Xác nhận giải trình thành công');
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
      }
    );

  }
  reportLogWorkModal(data = null) {
    const modal = this.modalService.open(BaoCaoCongViecModal, {
      centered: true,
      size: "md",
      backdrop: "static",
      keyboard: false,
    });
    modal.result.then((result) => { });
  }

  datesUpdatedRange($event: Object) {
    this.getListDataByFilter();
  }
  isInvalidDate = (m: Dayjs) => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };
  isCustomDate = (date: Dayjs) => {
    return date.month() === 0 || date.month() === 6 ? 'mycustomdate' : false;
  };
  isTooltipDate = (m: Dayjs) => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    return tooltip ? tooltip.text : false;
  };

}