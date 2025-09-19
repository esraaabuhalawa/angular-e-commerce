import { Component, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { RouterLink } from '@angular/router';
import { WishlistService } from './services/wishlist.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlist: Product[] = [];
  wishlistSub: Subscription | null = null
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID)

  getWishLists(): void {
    this.wishlistSub = this.wishlistService.userWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data
      }
    })
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getWishLists();
    }
  }
  ngOnDestroy(): void {
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe()
    }
  }
}
