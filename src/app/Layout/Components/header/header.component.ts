import {Component, HostBinding, OnInit} from '@angular/core';
import {filter, Observable} from 'rxjs';
import { ConfigService } from '../../../ThemeOptions/store/config.service';
import { ConfigState } from '../../../ThemeOptions/store/config.state';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {ThemeOptions} from '../../../theme-options';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  standalone: false,
})
export class HeaderComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  listMenus: any[] = [
    {
      header: "Dashboard",
      key: "dashboard",
    },
    {
      header: "Danh sách công ty",
      key: "companyChild",
    },
    {
      header: "",
      key: "customer",
    },
    {
      header: "",
      key: "jobProcess",
    },
    {
      header: "",
      key: "jobCustomer",
    },
    {
      header: "",
      key: "department",
    },
    {
      header: "",
      key: "employee",
    },
    {
      header: "",
      key: "workLog",
    },
  ];
  headerTitle: any
  public config$: Observable<ConfigState>;

  constructor(
    public globals: ThemeOptions,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.config$ = this.configService.config$;
  }

  @HostBinding("class.isActive")
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive = false;
  ngOnInit(): void {
    let extraParameter = this.activatedRoute.snapshot.firstChild?.data['extraParameter']
    this.headerTitle = this.listMenus.find(item => item.key === extraParameter)?.header || ''
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      extraParameter = this.activatedRoute.snapshot.firstChild?.data['extraParameter']
      this.headerTitle = this.listMenus.find(item => item.key === extraParameter)?.header || ''
    })
  }
  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
    // Clear hover state when toggling
    if (this.globals.toggleSidebar) {
      this.globals.sidebarHover = false;
    }
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }
}
