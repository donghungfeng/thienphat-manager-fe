import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared.module";
import { ZaloOAComponent } from "./zalo-oa.component";

@NgModule({
  declarations: [ZaloOAComponent],
  imports: [SharedModule, CommonModule],
  exports: [ZaloOAComponent]
})
export class ZaloOAModule {}
