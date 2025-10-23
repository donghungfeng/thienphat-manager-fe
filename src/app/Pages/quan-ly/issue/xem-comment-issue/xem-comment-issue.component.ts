import { HttpResponse } from "@angular/common/http";
import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { NgbActiveOffcanvas, NgbModal, NgbOffcanvas, NgbOffcanvasRef } from "@ng-bootstrap/ng-bootstrap";
import { IssueModel } from "src/app/shared/model/issue/issue.model";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { ThongTinIssueModal } from "../thong-tin-issue/thong-tin-issue.component";
import moment from "moment";
import { ToastService } from "src/app/shared/service/toast.service";

@Component({
  selector: "xem-comment-issue",
  templateUrl: "./xem-comment-issue.component.html",
  styleUrls: ["xem-comment-issue.component.scss"],
  standalone: false,
})
export class XemCommentIssueDrawer implements OnInit, AfterViewChecked {
  @Input() data: any;
  @ViewChild("scrollContainer") private scrollContainer!: ElementRef;
  dataIssue: IssueModel = new IssueModel();
  isLoading = false;
  isReturn = false
  isEdit = false
  listComment: any[] = [
    {
      id: 1,
      content:
        "Mọi người cố gắng hoàn thành sớm công việc để đi liên hoan nhé mọi người ơi",
      isLike: false,
    },
    {
      id: 2,
      content:
        "Mọi người cố gắng hoàn thành sớm công việc để đi liên hoan nhé mọi người ơi",
      isLike: false,
    },
    {
      id: 3,
      content:
        "Mọi người cố gắng hoàn thành sớm công việc để đi liên hoan nhé mọi người ơi",
      isLike: false,
    },
    {
      id: 4,
      content:
        "Mọi người cố gắng hoàn thành sớm công việc để đi liên hoan nhé mọi người ơi",
      isLike: false,
    },
    {
      id: 5,
      content:
        "Mọi người cố gắng hoàn thành sớm công việc để đi liên hoan nhé mọi người ơi",
      isLike: false,
    },
    {
      id: 6,
      content:
        "Mọi người cố gắng hoàn thành sớm công việc để đi liên hoan nhé mọi người ơi",
      isLike: false,
    },
  ];
  commentText: any;
  infoUser: any
  constructor(
    private apiService: IssueRequestServices,
    private spinner: SpinnerService,
    private drawer: NgbActiveOffcanvas,
    public svShare: ShareService,
    private modalService: NgbModal,
    private api: IssueRequestServices,
    private toast: ToastService
  ) {
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'))
  }
  ngOnInit(): void {
    this.getDetail();
  }
  ngAfterViewChecked(): void {
    // this.scrollToBottom();
  }
  getDetail() {
    this.spinner.show();
    this.apiService
      .detail(this.data.id)
      .then((res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.dataIssue = res.body.result;
        }
      })
      .finally(() => this.spinner.hide());
  }
  close(isReturn = false) {
    this.drawer.close(this.isReturn);
  }
  reactionComment(data) {
    const index = this.listComment.findIndex((item) => data.id === item.id);
    if (index !== -1) {
      this.listComment[index].isLike = !this.listComment[index].isLike;
    }
  }
  sendComment() {
    this.listComment.push({
      id: this.listComment.length + 1,
      content: this.commentText,
    });
    this.commentText = "";
    this.scrollToBottom()
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
  submit() {
    this.dataIssue.dueDate = this.dataIssue.dueDate.day + '/' + this.dataIssue.dueDate.month + '/' + this.dataIssue.dueDate.year
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
}