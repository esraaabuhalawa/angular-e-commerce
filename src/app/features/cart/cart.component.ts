import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [
    { id: '1', name: 'LCD Monitor', price: 650, quantity: 1, image: '/images/lcd-monitor.png' },
    { id: '2', name: 'H1 Gamepad', price: 550, quantity: 2, image: '/images/gamepad.png' }
  ];

  couponCode: string = '';

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get shipping(): string {
    return 'Free';
  }

  get total(): number {
    return this.subtotal;
  }

  ngOnInit(): void {}

  updateCart() {
    console.log('Cart updated:', this.cartItems);
  }

  removeItem(itemId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  applyCoupon() {
    console.log('Coupon applied:', this.couponCode);
  }
}
