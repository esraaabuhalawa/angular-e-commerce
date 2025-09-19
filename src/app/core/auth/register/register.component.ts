import { Subscription } from 'rxjs';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  showRePassword: boolean = false;
  errorMsg: string = "";
  isLoading: boolean = false;
  userData: object = {}
  token: string = ''
  registerSub: Subscription = new Subscription();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService)
private readonly cookieService = inject(CookieService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  toggleRePassword() {
    this.showRePassword = !this.showRePassword;
  }
  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  registerForm!: FormGroup;

  initForm(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{6,}$/)]],
      rePassword: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{6,}$/)]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { validators: this.confirmPassword })
  }

  ngOnInit(): void {
    this.initForm();
  }

  confirmPassword(group: AbstractControl) {
    let password = group.get('password');
    let repassword = group.get('rePassword');
    if (!password || !repassword) {
      return null
    }
    return password.value === repassword.value ? null : { passwordMismatch: true };
  }


  submitForm(): void {
    if (this.registerForm.valid) {
      this.registerSub.unsubscribe();
      this.isLoading = true
      this.registerSub = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.message === "success") {
            this.userService.setUser(res.user);
            this.userData = res.user;
            // ✅ Only set localStorage if in browser
            if (isPlatformBrowser(this.platformId)) {
              this.cookieService.set('authToken', res.token)
              // localStorage.setItem('authToken', this.token);
              // localStorage.setItem('userData', JSON.stringify(this.userData));
            }
            this.router.navigate(['/home'])
            this.errorMsg = '';
            // this.router.navigate(['/auth/login'])
          }
          this.isLoading = false
        },
        error: (err) => {
          if (err.error.message) {
            this.errorMsg = err.error.message;
          }
          this.isLoading = false
          // console.log(err)
        },
        complete: () => {
          this.isLoading = false
        }
      })
      //console.log(this.registerForm.value)
    } else {
      this.registerForm.setErrors({ passwordMismatch: true })
      this.registerForm.markAllAsTouched();
    }
  }
}

