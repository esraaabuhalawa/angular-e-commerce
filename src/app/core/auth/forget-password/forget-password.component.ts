import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  steps: number = 1;

  emailForm!: FormGroup;
  codeForm!: FormGroup;
  resetForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  private initForms(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codeForm = this.fb.group({
      resetCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  private readonly authService = inject(AuthService);
  private readonly toasterService = inject(ToastrService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  isLoadingCode: boolean = false;
  isLoadingPass: boolean = false;

  sendCode(): void {
    if (this.emailForm.valid) {
      this.isLoading = true
      console.log('Send code to:', this.emailForm.value);
      this.authService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          this.toasterService.warning('Please, Check your Email');
          this.steps = 2;
        },
        error: (err) => {
          this.isLoading = false
          this.toasterService.error(err.messge)
        }
      })

    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  verifyCode(): void {
    if (this.codeForm.valid) {
      this.isLoadingCode = true
      this.authService.verifyResetcode(this.codeForm.value).subscribe({
        next: (res) => {
          this.isLoadingCode = false
          this.toasterService.success(res.message);
          this.steps = 3;
        },
        error: (err) => {
          this.isLoadingCode = false
          this.toasterService.error('An Error Occured, Please try again later')
        }
      })
      // Optionally carry email forward to resetForm
      this.resetForm.patchValue({ email: this.emailForm.value.email });
    } else {
      this.codeForm.markAllAsTouched();
    }
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      this.isLoadingPass = true
      this.authService.resetPass(this.resetForm.value).subscribe({
        next: (res) => {
          this.isLoadingPass = false
          this.toasterService.success('Your PAssword is Updated');
          this.router.navigate(['/auth/login'])
        },
        error: (err) => {
          this.isLoadingPass = false
          this.toasterService.error('An Error Occured, Please try again later')
        }
      })
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
