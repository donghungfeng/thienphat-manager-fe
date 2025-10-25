import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared.module";
import { CommonModule } from "@angular/common";
import { PhongBanComponent } from "./phong-ban/phong-ban.component";
import { ThemSuaPhongBanModal } from "./phong-ban/them-sua-phong-ban/them-sua-phong-ban.component";
import { NhanVienComponent } from "./nhan-vien/nhan-vien.component";
import { ThemSuaNhanVienModal } from "./nhan-vien/them-sua-nhan-vien/them-sua-nhan-vien.component";
import { BangChamCongComponent } from "./bang-cham-cong/bang-cham-cong.component";
import { BaoCaoCongViecModal } from "./bang-cham-cong/bao-cao-cong-viec/bao-cao-cong-viec.component";
import { GiaiTrinhChamCongModal } from "./bang-cham-cong/giai-trinh-cham-cong/giai-trinh-cham-cong.component";
import { ThongTinChamCongModal } from "./bang-cham-cong/thong-tin-cham-cong/thong-tin-cham-cong.component";
import { DoiMatKhauModal } from "./nhan-vien/doi-mat-khau/doi-mat-khau.component";
import { PhanQuyenModal } from "./nhan-vien/phan-quyen/phan-quyen.component";
import { ThongTinIssueModal } from "./issue/thong-tin-issue/thong-tin-issue.component";
import { IssueComponent } from "./issue/issue.component";
import { XemCommentIssueDrawer } from "./issue/xem-comment-issue/xem-comment-issue.component";
import { NgxDaterangepickerBootstrapModule } from "ngx-daterangepicker-bootstrap";
import { NgxSelectModule } from 'ngx-select-ex';
@NgModule({
  declarations: [
    PhongBanComponent,
    ThemSuaPhongBanModal,
    NhanVienComponent,
    ThemSuaNhanVienModal,
    BangChamCongComponent,
    IssueComponent,
    BaoCaoCongViecModal,
    GiaiTrinhChamCongModal,
    ThongTinChamCongModal,
    ThongTinIssueModal,
    DoiMatKhauModal,
    PhanQuyenModal,
    XemCommentIssueDrawer,
  ],
  imports: [SharedModule, CommonModule, NgxDaterangepickerBootstrapModule.forRoot(), NgxSelectModule],
  exports: [
    PhongBanComponent,
    ThemSuaPhongBanModal,
    NhanVienComponent,
    ThemSuaNhanVienModal,
    BangChamCongComponent,
    IssueComponent,
    BaoCaoCongViecModal,
    GiaiTrinhChamCongModal,
    ThongTinChamCongModal,
    ThongTinIssueModal,
    DoiMatKhauModal,
    PhanQuyenModal,
    XemCommentIssueDrawer,
  ],
})
export class QuanLyModule {}
