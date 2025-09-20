import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  errorMsg: string = "";
  isLoading: boolean = false;
  checkoutForm!: FormGroup;

  //private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder);
  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: ['', [Validators.required, Validators.minLength(5)]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: ['', [Validators.required]],
      }),
    });
  }

  private readonly activateRoute = inject(ActivatedRoute);
  private readonly cartservice = inject(CartService);
  private platformId = inject(PLATFORM_ID);
  private readonly toasterService = inject(ToastrService);
  private router = inject(Router);

  fetchId: Subscription | null = null;
  cartId: string | null = null;

  getPageRoute() {
    this.fetchId = this.activateRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id')
      },
    })
  }

  redirectToVisa(url: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = url;
    }
  }

  cashDone: boolean = false;
  visaDone: boolean = false;

  submitForm(type: any) {
    this.cashDone = true;
    if (this.checkoutForm.valid) {
      if (type === 'cash') {
        this.cartservice.createCashOrder(this.cartId, this.checkoutForm.value).subscribe(
          {
            next: (res) => {
              this.cartservice.clearUserCart().subscribe({
                next: () => {
                  this.toasterService.success('Order Created Successfully');
                  this.router.navigate(['/allorders']);
                  this.cashDone = false;
                },
                error: (err) => console.error('Error clearing cart:', err)
              });
            },
            error: (err) => {
              console.log(err);
              this.cashDone = false;
            }
          }
        )
      } else if (type === 'visa') {
        this.visaDone = true;
        this.cartservice.checkoutSession(this.cartId, this.checkoutForm.value).subscribe(
          {
            next: (res) => {
              if (res?.status === 'success') {
                this.redirectToVisa(res.session.url);
                this.visaDone = false;
              }
            },
            error: (err) => {
              this.visaDone = false;
              console.log(err)
            }
          }
        )
      }

    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getPageRoute();
  }

  ngOnDestroy(): void {
    this.fetchId?.unsubscribe()
  }
}
