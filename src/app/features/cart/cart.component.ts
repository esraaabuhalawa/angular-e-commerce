import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Cart } from './interface/cart.interface';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule, CurrencyPipe, LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Cart[] = [];
  private readonly cartService = inject(CartService);
  cartSub: Subscription | null = null;
  loading: boolean = false;
  cartLength: number = 0;
  total: number = 0;

  private readonly toasterService = inject(ToastrService);

  increaseQty(product: any) {
    product.count++;
    this.cartService.updateProductQuantity(product.product._id, { count: product.count }).subscribe({
      next: (res) => {
        this.toasterService.success('Quantity updated Successfully');
      },
      error: () => {
        product.count--; // rollback on error
        this.toasterService.error('Failed to update quantity');
      }
    });
  }

  decreaseQty(product: any) {
    if (product.count > 1) {
      product.count--;
      this.cartService.updateProductQuantity(product.product._id, { count: product.count }).subscribe({
        next: (res) => {
          this.toasterService.success('Quantity updated Successfully');
        },
        error: () => {
          product.count++;
          this.toasterService.error('Failed to update quantity');
        }
      });
    }
  }

  removeProduct(productId:any){
    this.cartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        this.cartItems = res.data.products;
        this.toasterService.success('Product deleted Successfully');
      },
      error: (err) => {
        this.toasterService.error('Failed to delete product');
        console.log(err)
      }
    })
  }

  emptyCart(){
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
       this.fetchCartItems();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  cartId!:string;

  fetchCartItems() {
    this.loading = true;
    this.cartSub = this.cartService.getCartProducts().subscribe({
      next: (res) => {
        this.loading = false;
        this.cartLength = res.numOfCartItems;
        this.total = res.data.totalCartPrice;
        this.cartId = res.data._id
        console.log(this.cartId);
        this.cartItems = res.data.products;
      },
      error: (err) => {
        this.loading = false
      }
    })
  }

  ngOnInit(): void {
    this.fetchCartItems();
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }
}
