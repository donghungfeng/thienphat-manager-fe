import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ShareService } from "src/app/shared/service/shareService.service";
import { ThemSuaNhanVienModal } from "./them-sua-nhan-vien/them-sua-nhan-vien.component";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { AuthRequestServices } from "src/app/shared/service/request/auth/auth-request.service";
import { HttpResponse } from "@angular/common/http";
import { NhanVienModel } from "src/app/shared/model/nhan-vien/nhan-vien.model";
import { DeleteConfirmModal } from "src/app/Layout/Components/common/delete-cofirm-modal/delete-cofirm-modal.component";

@Component({
  selector: "nhan-vien",
  templateUrl: "./nhan-vien.component.html",
  styleUrls: ["nhan-vien.component.scss"],
  standalone: false,
})
export class NhanVienComponent implements OnInit {
  page = 1;
  size = 10;
  totalItems = 0;
  username: any
  fullName: any
  phone: any
  address: any
  status = ''
  identityCardNumber: any
  department: any
  deviceName: any
  deviceCode: any
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Username",
      key: "userName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Tên nhân viên",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Số điện thoại",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Địa chỉ",
      key: "address",
      class: "",
      style: "width: 350px",
    },
    {
      name: "CCCD",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Phòng ban",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Thiết bị",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Mã thiết bị",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Trạng thái",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Ghi chú",
      key: "phone",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
  ];
  listDatas: NhanVienModel[] = [];
  constructor(
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiUser: AuthRequestServices,
    public svShare: ShareService
  ) {}
  ngOnInit(): void {
    this.getListDataByFilter();
  }
  addEditEmployee(data = null, mode = 'add') {
    if (!data) {
      const modal = this.modalService.open(ThemSuaNhanVienModal, {
        centered: true,
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
      modal.result.then((result) => {
        if (result) {
          this.page = 1
          this.getListDataByFilter()
        }
      });
    } else {
      const modal = this.modalService.open(ThemSuaNhanVienModal, {
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
      if (this.username) {
        filter.push(`username==*${this.username}*`);
      }
      if (this.fullName) {
        filter.push(`fullName==*${this.fullName}*`);
      }
      if (this.phone) {
        filter.push(`phone==*${this.phone}*`);
      }
      if (this.address) {
        filter.push(`address==*${this.address}*`);
      }
      if (this.status) {
        filter.push(`status==${this.status}`);
      }
      if (this.deviceName) {
        filter.push(`deviceName==*${this.deviceName}*`);
      }
      if (this.deviceCode) {
        filter.push(`deviceCode==*${this.deviceCode}*`);
      }
      if (this.identityCardNumber) {
        filter.push(`identityCardNumber==*${this.identityCardNumber}*`);
      }
      if (this.department) {
        filter.push(`department.name==*${this.department}*`);
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
    this.apiUser
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
    this.page = 1
    this.getListDataByFilter()
  }
  resetData() {
    this.username = ''
    this.fullName = ''
    this.status = null
    this.phone = ''
    this.page = 1
    this.address = ''
    this.getListDataByFilter()
  }
  deleleItem(id: any) {
    const modal: NgbModalRef = this.modalService.open(DeleteConfirmModal)

    modal.result.then((result) => {
      if (result) {
        this.spinner.show()
        this.apiUser.delete(id).then((res: HttpResponse<any>) => {
          if (res.body.code === 200) {
            this.toast.success('Xóa bản ghi thành công')
            this.getListDataByFilter()
          }
        })
        .catch(err => {
          this.toast.error(err.error.message)  
        })
        .finally(() => this.spinner.hide())
      }
    });
  }
  changePage(event: any) {
    this.page = event
    this.getListDataByFilter()
  }
}