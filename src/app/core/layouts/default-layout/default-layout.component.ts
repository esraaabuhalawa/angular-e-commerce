import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-default-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);


  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
        this.wishlistService.loadWishlist();
        this.cartService.loadCartCount(); // Load cart count on init
    }
  }

}
