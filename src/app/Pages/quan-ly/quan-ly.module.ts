import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared.module";
import { CommonModule } from "@angular/common";
import { PhongBanComponent } from "./phong-ban/phong-ban.component";
import { ThemSuaPhongBanModal } from "./phong-ban/them-sua-phong-ban/them-sua-phong-ban.component";

@NgModule({
  declarations: [
    PhongBanComponent,
    ThemSuaPhongBanModal
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    PhongBanComponent,
    ThemSuaPhongBanModal
  ],
})
export class QuanLyModule {}
