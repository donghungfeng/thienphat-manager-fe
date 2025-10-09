import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// Import all components from barrel file
import {
  // Dashboard components
  AnalyticsComponent,
  
  // Elements components
  StandardComponent,
  DropdownsComponent,
  CardsComponent,
  ListGroupsComponent,
  TimelineComponent,
  IconsComponent,
  
  // Components
  AccordionsComponent,
  TabsComponent,
  CarouselComponent,
  ModalsComponent,
  PaginationComponent,
  ProgressBarComponent,
  TooltipsPopoversComponent,
  
  // Form components
  ControlsComponent,
  LayoutComponent,
  
  // Table components
  RegularComponent,
  TablesMainComponent,
  
  // Widget components
  ChartBoxes3Component,
  
  // User pages components
  ForgotPasswordBoxedComponent,
  LoginBoxedComponent,
  RegisterBoxedComponent,

  // Chart components  
  ChartjsComponent,
  LoginComponent,
  DashboardHomeComponent
} from './components.barrel';
import { CongTyComponent } from './Pages/cong-ty/cong-ty/cong-ty.component';
import { KhachHangComponent } from './Pages/cong-ty/khach-hang/khach-hang.component';
import { PhongBanComponent } from './Pages/quan-ly/phong-ban/phong-ban.component';
import { NhanVienComponent } from './Pages/quan-ly/nhan-vien/nhan-vien.component';
import { BangChamCongComponent } from './Pages/quan-ly/bang-cham-cong/bang-cham-cong.component';
import { XuLyCongViecComponent } from './Pages/cong-viec/xu-ly-cong-viec/xu-ly-cong-viec.component';
import { ZaloOAComponent } from './Pages/zalo-oa/chat-oa/zalo-oa.component';
import { UserRouteAccessService } from './user-route-access-service';
import { MauTinComponent } from './Pages/zalo-oa/mau-tin/mau-tin.component';
import { ChienDichComponent } from './Pages/zalo-oa/chien-dich/chien-dich.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: BaseLayoutComponent,
    canActivate: [UserRouteAccessService],
    children: [
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardHomeComponent,
        data: { extraParameter: "dashboard" },
      },
      {
        path: "cong-ty",
        component: CongTyComponent,
        data: { extraParameter: "companyChild" },
      },
      {
        path: "khach-hang",
        component: KhachHangComponent,
        data: { extraParameter: "customer" },
      },
      {
        path: "phong-ban",
        component: PhongBanComponent,
        data: { extraParameter: "department" },
      },
      {
        path: "nhan-vien",
        component: NhanVienComponent,
        data: { extraParameter: "employee" },
      },
      {
        path: "bang-cham-cong",
        component: BangChamCongComponent,
        data: { extraParameter: "workLog" },
      },
      {
        path: "xu-ly-cong-viec",
        component: XuLyCongViecComponent,
        data: { extraParameter: "jobProcess" },
      },
      {
        path: "zalo-oa",
        component: ZaloOAComponent,
        data: { extraParameter: "zalo-oa" },
      },
      {
        path: "mau-tin",
        component: MauTinComponent,
        data: { extraParameter: "template" },
      },
      {
        path: "chien-dich",
        component: ChienDichComponent,
        data: { extraParameter: "campaign" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}