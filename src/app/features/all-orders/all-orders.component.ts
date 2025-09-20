import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-all-orders',
  imports: [ CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  id!: string;
  orders: any[] = []

  getUserOrders() {
    const token = this.authService.decodeToken() as any;
    this.cartService.getUserOrders(token.id).subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getUserOrders();
  }
}
