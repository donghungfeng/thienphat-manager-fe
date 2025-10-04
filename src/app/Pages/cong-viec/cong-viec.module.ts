import { NgModule } from "@angular/core";
import { BaseChartDirective } from "ng2-charts";
import { SharedModule } from "src/app/shared.module";
import { XuLyCongViecComponent } from "./xu-ly-cong-viec/xu-ly-cong-viec.component";
import { ThemCongViecModal } from "./xu-ly-cong-viec/them-cong-viec/them-cong-viec.component";

// Dashboard Components

@NgModule({
  declarations: [XuLyCongViecComponent, ThemCongViecModal],
  imports: [SharedModule, BaseChartDirective],
  exports: [XuLyCongViecComponent, ThemCongViecModal],
})
export class CongViecModule {}
