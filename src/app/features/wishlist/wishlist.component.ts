import { Component, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { RouterLink } from '@angular/router';
import { WishlistService } from './services/wishlist.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, ProductCardComponent, CommonModule, LoaderComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID)

  wishlistItems$ = this.wishlistService.wishlist$;
  isLoading$ = this.wishlistService.isLoading$;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.wishlistService.loadWishlist();
    }
  }
  ngOnDestroy(): void {
  }
}
