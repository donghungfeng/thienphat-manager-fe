import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ThemSuaKhachHangModal } from "./them-sua-khach-hang/them-sua-khach-hang.component";
import { CustomerRequestServices } from "src/app/shared/service/request/khach-hang/khach-hang-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { DeleteConfirmModal } from "src/app/Layout/Components/common/delete-cofirm-modal/delete-cofirm-modal.component";
import { HttpResponse } from "@angular/common/http";
import { KhachHangModel } from "src/app/shared/model/khach-hang/khach-hang.model";
import { CompanyRequestServices } from "src/app/shared/service/request/cong-ty/cong-ty-request.service";
import { CongTyModel } from "src/app/shared/model/cong-ty/cong-ty.model";

@Component({
  selector: "khach-hang-cmp",
  templateUrl: "./khach-hang.component.html",
  styleUrls: ["khach-hang.component.scss"],
  standalone: false,
})
export class KhachHangComponent implements OnInit {
  page = 1;
  size = 10;
  totalItems = 0;
  name: any
  phone: any
  companyName: any
  address: any
  userId: any
  status: any
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên khách hàng",
      key: "customerName",
      class: "",
      style: "min-width: 230px",
    },
    {
      name: "Số điện thoại",
      key: "phone",
      class: "",
      style: "min-width: 150px; max-width: 200px",
    },
    {
      name: "Công ty",
      key: "companyName",
      class: "",
      style: "min-width: 400px",
    },
    {
      name: "Địa chỉ",
      key: "address",
      class: "",
      style: "min-width: 350px",
    },
    {
      name: "Zalo ID",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Trạng thái",
      key: "status",
      class: "",
      style: "width: 200px",
    },
  ];
  listDatas: KhachHangModel[] = [
  ];
  constructor(
    private modalService: NgbModal,
    private apiCustomer: CustomerRequestServices,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiCongTy: CompanyRequestServices
  ) {}
  ngOnInit(): void {
    this.getListDataByFilter();
  }
  addEditCustomer(data = null, mode = 'add') {
    if (!data) {
      const modal = this.modalService.open(ThemSuaKhachHangModal, {
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
      });
    } else {
      const modal = this.modalService.open(ThemSuaKhachHangModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.componentInstance.data = data;
      modal.componentInstance.mode = mode
      modal.result.then((result) => {
        if (result) {
          this.getListDataByFilter();
        }
      });
    }
  }
  getListDataByFilter() {
    const filterString = () => {
      let filter = [];
      filter.push("id>0");
      if (this.name) {
        filter.push(`name==*${this.name}*`);
      }
      if (this.phone) {
        filter.push(`phone==*${this.phone}*`);
      }
      if (this.address) {
        filter.push(`address==*${this.address}*`);
      }
      if (this.userId) {
        filter.push(`userId==*${this.userId}*`);
      }
      if (this.status) {
        filter.push(`status==${this.status}`);
      }
      if (this.companyName) {
        filter.push(`company.name==*${this.companyName}*`);
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
    this.apiCustomer
      .search(params)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.listDatas = res.body.result.content;
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
    this.name = ''
    this.phone = ''
    this.address = ''
    this.companyName = ''
    this.userId = ''
    this.status = ''
    this.getListDataByFilter();
  }
  deleleItem(id: any) {
    const modal: NgbModalRef = this.modalService.open(DeleteConfirmModal);
    modal.result.then((result) => {
      if (result) {
        this.spinner.show();
        this.apiCustomer
          .delete(id)
          .then((res: HttpResponse<any>) => {
            if (res.body.code === 200) {
              this.toast.success("Xóa bản ghi thành công");
              this.getListDataByFilter();
            }
          })
          .catch((err) => {
            this.toast.error(err.error.message);
          })
          .finally(() => this.spinner.hide());
      }
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getListDataByFilter();
  }
}