import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestServices } from 'src/app/shared/service/request/auth/auth-request.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  standalone: false,
  styles: [],
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: NonNullableFormBuilder,
    private apiAuth: AuthRequestServices
  ) {
    this.form = this.fb.group({
      username: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
      password: [
        "",
        {
          validators: [Validators.required],
          updateOn: "change",
        },
      ],
    });
  }
  onSubmit() {
    const payload = {
      ...this.form.value
    }
    this.apiAuth.login(payload).then((res: any) => {
      if (res.body.code === 200) {
        localStorage.setItem('token', res.body.result.token)
        localStorage.setItem("infoUser", JSON.stringify(res.body.result));
        this.router.navigate(["/"]);
      }
    })
  }
}
