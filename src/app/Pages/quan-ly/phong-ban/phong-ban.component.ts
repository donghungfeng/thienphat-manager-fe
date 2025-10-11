import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ThemSuaPhongBanModal } from "./them-sua-phong-ban/them-sua-phong-ban.component";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { HttpResponse } from "@angular/common/http";
import { DepartmentRequestServices } from "src/app/shared/service/request/phong-ban/phong-ban-request.service";
import { DeleteConfirmModal } from "src/app/Layout/Components/common/delete-cofirm-modal/delete-cofirm-modal.component";
import { PhongBanModel } from "src/app/shared/model/phong-ban/phong-ban.model";
import { ShareService } from "src/app/shared/service/shareService.service";

@Component({
  selector: "phong-ban",
  templateUrl: "./phong-ban.component.html",
  styleUrls: ["phong-ban.component.scss"],
  standalone: false,
})
export class PhongBanComponent implements OnInit {
  page = 1;
  size = 10;
  totalItems = 0;
  name: any;
  factoryName: any;
  status: any;
  note: any;
  longtitude: any;
  latitude: any;
  ip: any;
  threshold: any;
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên Phòng ban",
      key: "companyName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Tên cơ sở",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Kinh độ",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Vĩ độ",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Địa chỉ IP",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Ngưỡng",
      key: "taxNumber",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
    {
      name: "Trạng thái",
      key: "phone",
      class: "",
      style: "width: 150px",
    },
    {
      name: "Ghi chú",
      key: "address",
      class: "",
      style: "width: 150px; max-width: 200px",
    },
  ];
  listDatas: PhongBanModel[] = [];
  constructor(
    private modalService: NgbModal,
    private spinner: SpinnerService,
    private toast: ToastService,
    private apiDepartment: DepartmentRequestServices,
    public svShare: ShareService
  ) {}
  ngOnInit(): void {
    this.getListDataByFilter();
  }
  addEditDepartment(data = null, mode = "add") {
    if (!data) {
      const modal = this.modalService.open(ThemSuaPhongBanModal, {
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
      const modal = this.modalService.open(ThemSuaPhongBanModal, {
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
  getListDataByFilter() {
    const filterString = () => {
      let filter = [];
      filter.push("id>0");
      if (this.name) {
        filter.push(`name==*${this.name}*`);
      }
      if (this.factoryName) {
        filter.push(`factoryName==*${this.factoryName}*`);
      }
      if (this.note) {
        filter.push(`note==*${this.note}*`);
      }
      if (this.status) {
        filter.push(`status==${this.status}`);
      }
      if (this.latitude) {
        filter.push(`latitude==*${this.latitude}*`);
      }
      if (this.longtitude) {
        filter.push(`longtitude==*${this.longtitude}*`);
      }
      if (this.ip) {
        filter.push(`ip==*${this.ip}*`);
      }
      if (this.threshold) {
        filter.push(`threshold==*${this.threshold}*`);
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
    this.apiDepartment
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
    this.getListDataByFilter();
  }
  deleleItem(id: any) {
    const modal: NgbModalRef = this.modalService.open(DeleteConfirmModal);

    modal.result.then((result) => {
      if (result) {
        this.spinner.show();
        this.apiDepartment
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