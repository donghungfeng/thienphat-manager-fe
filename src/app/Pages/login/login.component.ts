import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styles: []
})
export class LoginComponent {

  constructor(
    private router: Router
  ) { }

  onSubmit() {
    this.router.navigate(['/'])
  }
}
