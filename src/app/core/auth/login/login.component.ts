import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMsg: string = '';

  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{6,}$/)])
  })

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  userData:object = {}
  token:string = ''
  isLoading: boolean = false;

  submitLogin(): void{
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res:any) =>{
          if(res.message === "success"){
            this.errorMsg = '';
            this.userData = res.user;
            this.token = res.token;
            localStorage.setItem('token',this.token);
            localStorage.setItem('userData', JSON.stringify(this.userData))
            this.router.navigate(['/home'])
            this.isLoading = false
          }
        //  console.log(res);
        },
        error: (err) => {
          if(err.error.message){
            this.errorMsg = err.error.message;
          }
          this.isLoading = false
        }
      })
      //console.log(this.loginForm.value);
    }
  }
}
