import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared.module";
import { CommonModule } from "@angular/common";
import { PhongBanComponent } from "./phong-ban/phong-ban.component";
import { ThemSuaPhongBanModal } from "./phong-ban/them-sua-phong-ban/them-sua-phong-ban.component";
import { NhanVienComponent } from "./nhan-vien/nhan-vien.component";
import { ThemSuaNhanVienModal } from "./nhan-vien/them-sua-nhan-vien/them-sua-nhan-vien.component";
import { BangChamCongComponent } from "./bang-cham-cong/bang-cham-cong.component";

@NgModule({
  declarations: [
    PhongBanComponent,
    ThemSuaPhongBanModal,
    NhanVienComponent,
    ThemSuaNhanVienModal,
    BangChamCongComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    PhongBanComponent,
    ThemSuaPhongBanModal,
    NhanVienComponent,
    ThemSuaNhanVienModal,
    BangChamCongComponent,
  ],
})
export class QuanLyModule {}
