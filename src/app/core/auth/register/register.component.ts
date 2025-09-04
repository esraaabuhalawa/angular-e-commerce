import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showRePassword: boolean = false;
  errorMsg:string = "";
  isLoading: boolean = false;
  toggleRePassword() {
    this.showRePassword = !this.showRePassword;
  }
  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z]).{6,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.confirmPassword })

  confirmPassword(group: AbstractControl) {
    let password = group.get('password');
    let repassword = group.get('rePassword');
    if (!password || !repassword) {
      return null
    }
    return password.value === repassword.value ? null : { passwordMismatch: true };
  }

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true
      this.authService.signUp(this.registerForm.value).subscribe ({
        next: (res:any) => {
          if(res.message === "success"){
            this.errorMsg = '';
            this.router.navigate(['/auth/login'])
          }
          this.isLoading = false
        },
        error: (err) =>{
           if(err.error.message){
            this.errorMsg = err.error.message;
          }
          this.isLoading = false
         // console.log(err)
        },
        complete :() => {
          this.isLoading = false
        }
      })
      console.log(this.registerForm.value)
    } else {
      console.log('is in valid ')
    }
  }
}

