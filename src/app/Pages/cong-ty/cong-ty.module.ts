import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared.module";
import { CongTyComponent } from "./cong-ty/cong-ty.component";
import { ThemSuaCongTyModal } from "./cong-ty/them-sua-cong-ty/them-sua-cong-ty.component";
import { CommonModule } from "@angular/common";
import { KhachHangComponent } from "./khach-hang/khach-hang.component";
import { ThemSuaKhachHangModal } from "./khach-hang/them-sua-khach-hang/them-sua-khach-hang.component";

@NgModule({
  declarations: [
    CongTyComponent,
    ThemSuaCongTyModal,
    KhachHangComponent,
    ThemSuaKhachHangModal,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    CongTyComponent,
    ThemSuaCongTyModal,
    KhachHangComponent,
    ThemSuaKhachHangModal,
  ],
})
export class CongTyModule {}
