import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {Observable} from 'rxjs';
import { ConfigService } from '../../../ThemeOptions/store/config.service';
import { ConfigState } from '../../../ThemeOptions/store/config.state';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: false,
  styles: [
    `
      /* Override the existing styles with important to ensure animation works */
      .vsm-dropdown {
        max-height: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
        transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out !important;
        position: relative !important;
      }

      .vsm-dropdown-show {
        max-height: 500px !important;
        opacity: 1 !important;
      }

      /* Arrow rotation - override existing transform */
      .vsm-item.has-sub .vsm-arrow {
        transition: transform 0.3s ease !important;
        transform: rotate(270deg) !important; /* Point right */
      }

      .vsm-item.has-sub.vsm-open .vsm-arrow {
        transform: rotate(360deg) !important; /* Point down */
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  public openMenus: string[] = [];

  // Supported menu types: dashboardsMenu, pagesMenu, elementsMenu, componentsMenu,
  // tablesMenu, formsMenu, chartsMenu, widgetsMenu

  public config$: Observable<ConfigState>;

  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService
  ) {
    this.config$ = this.configService.config$;
  }

  private newInnerWidth = 0;
  private innerWidth = 0;
  activeId = "dashboardsMenu";
  listMenus: any[] = [
    {
      header: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
      parent: "",
      name: "Dashboard",
      icon: "pe-7s-graph2",
      children: [],
    },
    {
      header: "",
      key: "company",
      path: "",
      parent: "",
      name: "Công ty",
      icon: "pe-7s-home",
      children: [
        {
          header: "Danh sách công ty",
          key: "companyChild",
          path: "/cong-ty",
          parent: "company",
          name: "Công ty",
          icon: "",
        },
        {
          header: "",
          key: "customer",
          path: "/khach-hang",
          parent: "company",
          name: "Khách hàng",
          icon: "",
        },
      ],
    },
    {
      header: "",
      key: "job",
      path: "",
      parent: "",
      name: "Công việc",
      icon: "pe-7s-file",
      children: [
        {
          header: "",
          key: "jobProcess",
          path: "/xu-ly-cong-viec",
          parent: "job",
          name: "Xử lý công việc",
          icon: "",
        },
        {
          header: "",
          key: "jobCustomer",
          path: "/xu-ly-cong-viec-khach-hang",
          parent: "job",
          name: "Khách hàng",
          icon: "",
        },
      ],
    },
    {
      header: "",
      key: "managemant",
      parent: "",
      path: "",
      name: "Quản lý",
      icon: "pe-7s-config",
      children: [
        {
          header: "",
          key: "department",
          path: "/phong-ban",
          parent: "managemant",
          name: "Phòng ban",
          icon: "",
        },
        {
          header: "",
          key: "employee",
          path: "/nhan-vien",
          parent: "managemant",
          name: "Nhân viên",
          icon: "",
        },
        {
          header: "",
          key: "workLog",
          path: "/bang-cham-cong",
          parent: "managemant",
          name: "Bảng chấm công",
          icon: "",
        },
      ],
    },
    {
      header: "Zalo OA",
      key: "zalo-oa",
      path: "/zalo-oa",
      parent: "",
      name: "Zalo OA",
      icon: "pe-7s-headphones",
      children: [],
    },
  ];
  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
    // If we're closing the sidebar, also clear the hover state
    if (this.globals.toggleSidebar) {
      this.globals.sidebarHover = false;
    }
  }

  onSidebarMouseEnter() {
    // Only allow hover to open sidebar if it's in collapsed state
    if (this.globals.toggleSidebar) {
      this.globals.sidebarHover = true;
    }
  }

  onSidebarMouseLeave() {
    // Only remove hover state if sidebar is in collapsed state
    if (this.globals.toggleSidebar) {
      this.globals.sidebarHover = false;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    // Get the extraParameter from the route to determine which menu should be open
    this.extraParameter =
      this.activatedRoute.snapshot.firstChild?.data["extraParameter"];

    // Initialize open menus based on current route
    if (this.extraParameter) {
      const findParent = this.listMenus.find((item) =>
        item.children.find((el) => el.key === this.extraParameter)
      );
      if (findParent) {
        this.openMenus = [findParent.key];
      } else {
        this.openMenus = [this.extraParameter];
      }
    }
  }

  toggleSubmenu(menuId: string) {
    // Toggle submenu: close if open, open if closed (and close all others)
    const index = this.openMenus.indexOf(menuId);
    if (index > -1) {
      this.openMenus.splice(index, 1);
    } else {
      this.openMenus = [menuId]; // Close others and open this one
    }
  }

  onNavigate() {
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 1200) {
      this.globals.toggleSidebarMobile = true;
      this.globals.sidebarHover = false;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    this.newInnerWidth = (event.target as Window).innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
  }
}
