import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  environment: any = environment;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  loginForm = this.formBuilder.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).add(() => {
      this.router.navigateByUrl('/');
    });
  }
}
