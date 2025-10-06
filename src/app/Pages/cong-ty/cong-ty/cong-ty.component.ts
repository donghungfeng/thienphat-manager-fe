import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ThemSuaCongTyModal } from "./them-sua-cong-ty/them-sua-cong-ty.component";
import { CompanyRequestServices } from "src/app/shared/service/request/cong-ty/cong-ty-request.service";
import { HttpResponse } from "@angular/common/http";
import { ShareService } from "src/app/shared/service/shareService.service";
import { CongTyModel } from "src/app/shared/model/cong-ty/cong-ty.model";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ToastService } from "src/app/shared/service/toast.service";
import { DeleteConfirmModal } from "src/app/Layout/Components/common/delete-cofirm-modal/delete-cofirm-modal.component";

@Component({
  selector: "cong-ty-component",
  templateUrl: "./cong-ty.component.html",
  styleUrls: ["cong-ty.component.scss"],
  standalone: false,
})
export class CongTyComponent implements OnInit {
  page = 1
  size = 10
  totalItems = 0
  name: any
  taxCode: any
  address: any
  phone: any
  headers: any[] = [
    {
      name: "ID",
      key: "index",
      class: "",
      style: "width: 50px",
    },
    {
      name: "Tên công ty",
      key: "companyName",
      class: "",
      style: "width: 350px",
    },
    {
      name: "Mã số thuế",
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
  ];
  listDatas: CongTyModel[] = [
  ];
  constructor(
    private modalService: NgbModal,
    private apiCompany: CompanyRequestServices,
    public svShare: ShareService,
    private spinner: SpinnerService,
    private toast: ToastService
  ) {
    
  }
  ngOnInit(): void {
    this.getListDataByFilter()
  }
  addEditComany(data = null, mode = 'add') {
    if (!data) {
      const modal = this.modalService.open(ThemSuaCongTyModal, {
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
      })
    } else {
      const modal = this.modalService.open(ThemSuaCongTyModal, {
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
  getListDataByFilter() {
    const filterString = () => {
      let filter = []
      filter.push("id>0")
      if (this.name) {
        filter.push(`name==*${this.name}*`)
      }
      if (this.taxCode) {
        filter.push(`taxCode==*${this.taxCode}*`);
      }
      if (this.phone) {
        filter.push(`phone==*${this.phone}*`);
      }
      if (this.address) {
        filter.push(`address==*${this.address}*`);
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
    this.apiCompany.search(params).then((res: HttpResponse<any>) => {
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
    this.page = 1
    this.name = ''
    this.taxCode = ''
    this.phone = ''
    this.address = ''
    this.getListDataByFilter()
  }
  deleleItem(id: any) {
    const modal: NgbModalRef = this.modalService.open(DeleteConfirmModal)
    modal.result.then((result) => {
      if (result) {
        this.spinner.show()
        this.apiCompany.delete(id).then((res: HttpResponse<any>) => {
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