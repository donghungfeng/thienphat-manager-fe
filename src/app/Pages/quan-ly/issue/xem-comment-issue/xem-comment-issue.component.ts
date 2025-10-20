import { HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { NgbOffcanvas, NgbOffcanvasRef } from "@ng-bootstrap/ng-bootstrap";
import { IssueModel } from "src/app/shared/model/issue/issue.model";
import { IssueRequestServices } from "src/app/shared/service/request/phong-ban/issue-request.service";
import { ShareService } from "src/app/shared/service/shareService.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";

@Component({
  selector: "xem-comment-issue",
  templateUrl: "./xem-comment-issue.component.html",
  styleUrls: ["xem-comment-issue.component.scss"],
  standalone: false,
})
export class XemCommentIssueDrawer implements OnInit {
  @Input() data: any;
  dataIssue: IssueModel = new IssueModel();
  isLoading = false;
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
  constructor(
    private apiService: IssueRequestServices,
    private spinner: SpinnerService,
    private drawer: NgbOffcanvas,
    public svShare: ShareService
  ) {}
  ngOnInit(): void {
    this.getDetail();
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
  close() {
    this.drawer.dismiss();
  }
  reactionComment(data) {
    const index = this.listComment.findIndex(item => data.id === item.id)
    if (index !== -1) {
      this.listComment[index].isLike = !this.listComment[index].isLike;
    }
  }
}