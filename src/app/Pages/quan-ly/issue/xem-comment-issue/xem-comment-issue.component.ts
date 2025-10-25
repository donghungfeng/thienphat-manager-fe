import { HttpResponse } from "@angular/common/http";
import { AfterViewChecked, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { NgbActiveModal, NgbActiveOffcanvas, NgbModal, NgbOffcanvas, NgbOffcanvasRef } from "@ng-bootstrap/ng-bootstrap";
import { IssueModel } from "src/app/shared/model/issue/issue.model";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ThongTinIssueModal } from "../thong-tin-issue/thong-tin-issue.component";
import moment from "moment";
import { ToastService } from "src/app/shared/service/toast.service";
import { CommentRequestService } from "src/app/shared/service/request/phong-ban/comment-request.service";
import { CommentModel } from "src/app/shared/model/issue/comment.model";
import { ConfirmModal } from "src/app/Layout/Components/common/cofirm-modal/cofirm-modal.component";
import { NhanVienModel } from "src/app/shared/model/nhan-vien/nhan-vien.model";
import { AuthRequestServices } from "src/app/shared/service/request/auth/auth-request.service";

@Component({
  selector: "xem-comment-issue",
  templateUrl: "./xem-comment-issue.component.html",
  styleUrls: ["xem-comment-issue.component.scss"],
  standalone: false,
})
export class XemCommentIssueDrawer implements OnInit, AfterViewChecked, OnDestroy {
  @Input() data: any;
  @ViewChild("scrollContainer") private scrollContainer!: ElementRef;
  dataIssue: IssueModel = new IssueModel();
  isLoading = false;
  isReturn = false
  isEdit = false
  page = 1;
  size = 9999;
  listComment: CommentModel[] = [
  ];
  commentText: any;
  infoUser: any
  ignoreFirstClick = false;
  backdropEl: HTMLElement | null = null;
  listNhanVien: NhanVienModel[] = []
  removeClickListener: (() => void) | null = null;
  constructor(
    private apiService: IssueRequestServices,
    private spinner: SpinnerService,
    private drawer: NgbActiveOffcanvas,
    public svShare: ShareService,
    private modalService: NgbModal,
    private api: IssueRequestServices,
    private toast: ToastService,
    private apiComment: CommentRequestService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private apiUser: AuthRequestServices
  ) {
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'))
  }
  ngOnInit(): void {
    this.getDetail();
    this.getListNhanVien()
  }
  ngAfterViewChecked(): void {
    this.backdropEl = document.querySelector('ngb-offcanvas-backdrop.show');
    if (this.backdropEl) {
      // Lắng nghe sự kiện click vào backdrop
      this.removeClickListener = this.renderer.listen(this.backdropEl, 'click', (event) => {
        event.stopPropagation();
        this.handleBackdropClick();
      });
    }
  }
  ngOnDestroy(): void {
     if (this.removeClickListener) this.removeClickListener();
  }
  handleBackdropClick() {
    if (this.ignoreFirstClick) return;
    this.ignoreFirstClick = true;
    if(this.isEdit) {
      const modal = this.modalService.open(ConfirmModal, {
        centered: true,
      });
      modal.componentInstance.title = 'Bạn đang chỉnh sửa thông tin. Bạn có muốn thoát không?'
      modal.result.then((result) => { 
        if(result) {
          this.close()
        }
      });
    } else {
      this.close()
    }
  }
  getDetail() {
    this.spinner.show();
    this.apiService
      .detail(this.data.id)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.dataIssue = res.body.result;
          this.getListComment(this.dataIssue.id)
        }
      })
      .finally(() => this.spinner.hide());
  }
  confirmClose() {
    if(this.isEdit) {
      const modal = this.modalService.open(ConfirmModal, {
        centered: true,
      });
      modal.componentInstance.title = 'Bạn đang chỉnh sửa thông tin. Bạn có muốn thoát không?'
      modal.result.then((result) => { 
        if(result) {
          this.close()
        }
      });
    } else {
      this.close()
    }
  }
  close(isReturn = false) {
    this.drawer.close(this.isReturn);
  }
  reactionComment(data) {
    // const index = this.listComment.findIndex((item) => data.id === item.id);
    // if (index !== -1) {
    //   this.listComment[index].isLike = !this.listComment[index].isLike;
    // }
  }
  getListComment(id: any) {
    const filterString = () => {
      let filter = []
      filter.push("id>0");
      if(id) {
        filter.push(`issue.id==${id}`)
      }
      return filter.join(";")
    }
    const params = {
      page: this.page - 1,
      size: this.size,
      filter: filterString(),
      sort: ["id", "desc"],
    };
    this.apiComment.search(params).then((res: HttpResponse<any>) => {
      if(res.body.code === 200) {
        this.listComment = res.body.result.content
      }
    })
  }
  sendComment() {
    const payload = {
      issueId: this.dataIssue.id,
      status: 0,
      text: this.commentText
    }
    this.apiComment.create(payload).then((res: HttpResponse<any>) => {
      if(res.body.code === 200) {
        this.commentText = ""
        this.getListComment(this.dataIssue.id)
        this.scrollToBottom()
      }
    })
  }
  deleteComment(id) {
    this.spinner.show()
    this.apiComment.delete(id).then((res: HttpResponse<any>) => {
      if(res.body.code === 200) {
        this.getListComment(this.dataIssue.id)
      }
    })
    .finally(() => this.spinner.hide())
  }
  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }
  editInfo() {
    this.isEdit = true
    if(this.isEdit) {
      this.dataIssue.dueDate = {
        day: +moment(this.dataIssue.dueDate, 'DD/MM/YYYY').format('DD'),
        month: +moment(this.dataIssue.dueDate, 'DD/MM/YYYY').format('MM'),
        year: +moment(this.dataIssue.dueDate, 'DD/MM/YYYY').format('YYYY')
      }
    }
  }
  changeStatus() {
    this.dataIssue.status = 3
    const payload = {
      code: this.dataIssue.code,
      title: this.dataIssue.title,
      url: this.dataIssue.url,
      assignId: this.dataIssue.assign ? this.dataIssue.assign.id : '',
      dueDate: this.dataIssue.dueDate,        // string (dd/MM/yyyy)
      resolveDate: this.dataIssue.resolveDate,    // string (dd/MM/yyyy)
      estimate: this.dataIssue.estimate,
      type: this.dataIssue.type,
      priority: +this.dataIssue.priority,
      status: +this.dataIssue.status,
      note: this.dataIssue.note,
      description: this.dataIssue.description,
      id: this.dataIssue.id
    }
    this.spinner.show()
    this.api.update(payload).then((res: HttpResponse<any>) => {
      if(res.body.code === 200) {
        this.toast.success('Cập nhật thông tin thành công')
        this.isEdit = false
        this.isReturn = true
        this.getDetail()
      } else {
        this.toast.error('Cập nhật thông tin thất bại')
      }
    })
    .catch(() => {
      this.toast.error('Có lỗi xảy ra, vui lòng thử lại')
    })
    .finally(() => this.spinner.hide())
  }
  submit() {
    let day = this.dataIssue.dueDate.day < 10 ? '0' + this.dataIssue.dueDate.day : this.dataIssue.dueDate.day
    let month = this.dataIssue.dueDate.month < 10 ? '0' + this.dataIssue.dueDate.month : this.dataIssue.dueDate.month
    let year = this.dataIssue.dueDate.year
    this.dataIssue.dueDate = day + '/' + month + '/' + year
    const payload = {
      code: this.dataIssue.code,
      title: this.dataIssue.title,
      url: this.dataIssue.url,
      assignId: this.dataIssue.assign ? this.dataIssue.assign.id : '',
      dueDate: this.dataIssue.dueDate,        // string (dd/MM/yyyy)
      resolveDate: this.dataIssue.resolveDate,    // string (dd/MM/yyyy)
      estimate: this.dataIssue.estimate,
      type: this.dataIssue.type,
      priority: +this.dataIssue.priority,
      status: +this.dataIssue.status,
      note: this.dataIssue.note,
      description: this.dataIssue.description,
      id: this.dataIssue.id
    }
    this.spinner.show()
    this.api.update(payload).then((res: HttpResponse<any>) => {
      if(res.body.code === 200) {
        this.toast.success('Cập nhật thông tin thành công')
        this.isEdit = false
        this.isReturn = true
        this.getDetail()
      } else {
        this.toast.error('Cập nhật thông tin thất bại')
      }
    })
    .catch(() => {
      this.toast.error('Có lỗi xảy ra, vui lòng thử lại')
    })
    .finally(() => this.spinner.hide())
  }
  getListNhanVien(text: any = '') {
    const filterString = () => {
      let filter = [];
      filter.push("id>0");
      if (text) {
        filter.push(`fullName==*${text}*`);
      }
      return filter.join(";");
    };
    const params = {
      page: this.page - 1,
      size: this.size,
      filter: filterString(),
      sort: ["id", "desc"],
    };
    this.apiUser
      .search(params)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.listNhanVien = res.body.result.content;
        } else {
          this.listNhanVien = [];
        }
      })
      .catch(() => {
        this.listNhanVien = [];
      })
      .finally(() => {
      });
  }
  searchUser(source: string, text: string) {
    setTimeout(() => {
      const convertText = this.svShare.removeVietnameseTones(text.toLocaleLowerCase())
      this.getListNhanVien(convertText)
    }, 500)
  }
  onSearchNhanVien = (search: string, item: any): boolean => {
    if (!search) return true;

    const term = this.svShare.removeVietnameseTones(search.toLowerCase());
    const name = this.svShare.removeVietnameseTones((item.text || '').toLowerCase());
    return name.includes(term);
  };
}