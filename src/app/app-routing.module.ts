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

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: BaseLayoutComponent,
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

      //   // Elements
      //   {path: 'elements/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      //   {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      //   {path: 'elements/icons', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      //   {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      //   {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      //   {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},

      //   // Components
      //   {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      //   {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      //   {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      //   {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      //   {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},
      //   {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      //   {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},

      //   // Charts
      //   {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: 'chartsMenu'}},

      //   // Forms
      //   {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formsMenu'}},
      //   {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formsMenu'}},

      //   // Tables
      //   {path: 'tables/regular', component: RegularComponent, data: {extraParameter: 'tablesMenu'}},
      //   {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},

      //   // Widgets
      //   {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'widgetsMenu'}},
    ],
  },
  {
    path: "",
    component: PagesLayoutComponent,
    children: [
      // User Pages
      {
        path: "pages/login-boxed",
        component: LoginBoxedComponent,
        data: { extraParameter: "" },
      },
      {
        path: "pages/register-boxed",
        component: RegisterBoxedComponent,
        data: { extraParameter: "" },
      },
      {
        path: "pages/forgot-password-boxed",
        component: ForgotPasswordBoxedComponent,
        data: { extraParameter: "" },
      },
    ],
  },
  { path: "**", redirectTo: "" },
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