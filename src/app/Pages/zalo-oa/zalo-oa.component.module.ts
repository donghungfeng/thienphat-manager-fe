import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared.module";
import { ZaloOAComponent } from "./chat-oa/zalo-oa.component";
import { MauTinComponent } from "./mau-tin/mau-tin.component";
import { ThemSuaMauTinComponent } from "./mau-tin/them-sua-mau-tin/them-sua-mau-tin.component";
import { ChienDichComponent } from "./chien-dich/chien-dich.component";
import { ThemSuaChienDichComponent } from "./chien-dich/them-sua-chien-dich/them-sua-chien-dich.component";

@NgModule({
  declarations: [
    ZaloOAComponent,
    MauTinComponent,
    ThemSuaMauTinComponent,
    ChienDichComponent,
    ThemSuaChienDichComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    ZaloOAComponent,
    MauTinComponent,
    ThemSuaMauTinComponent,
    ChienDichComponent,
    ThemSuaChienDichComponent,
  ],
})
export class ZaloOAModule {}
