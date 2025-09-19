import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  errorMsg: string = '';
  loginsub: Subscription = new Subscription();

  private readonly platformId = inject(PLATFORM_ID)
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginForm!: FormGroup;

  inIntForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{6,}$/)]]
    })
  }

  userData: object = {}
  token: string = ''
  isLoading: boolean = false;

  ngOnInit(): void {
    this.inIntForm();
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      this.loginsub.unsubscribe();
      this.isLoading = true;
      this.loginsub = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.message === "success") {
            this.errorMsg = '';
            this.userData = res.user;
            this.token = res.token;
            this.userService.setUser(res.user);
            // ✅ Only set localStorage if in browser
            if (isPlatformBrowser(this.platformId)) {
              this.cookieService.set('authToken', res.token);
              this.authService.decodeToken();
              //localStorage.setItem('authToken', this.token);

              //localStorage.setItem('userData', JSON.stringify(this.userData));
            }
            this.router.navigate(['/home'])
            this.isLoading = false
          }
          //  console.log(res);
        },
        error: (err) => {
          if (err.error.message) {
            this.errorMsg = err.error.message;
          }
          this.isLoading = false
        }
      })
      //console.log(this.loginForm.value);
    }
  }
}
