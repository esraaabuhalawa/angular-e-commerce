import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, StarRatingComponent, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) item: Product = {} as Product;

  wishlistService = inject(WishlistService);
  private readonly toasterService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  wishlistLoading: { [id: string]: boolean } = {};
  loading: boolean = false;

  constructor() {
    this.wishlistService.loadWishlist();
  }

  // Remove redHeart property and use this method instead
  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.item._id);
  }

  toggleWishlist(id: string) {
    if (this.wishlistLoading[id]) return;

    this.wishlistLoading[id] = true;

    if (!this.wishlistService.isInWishlist(id)) {
      this.wishlistService.addProductToWishlist({ productId: id }).subscribe({
        next: () => {
          this.toasterService.success('Product added to wishlist');
          this.wishlistLoading[id] = false;
        },
        error: () => {
          this.wishlistLoading[id] = false;
          this.toasterService.error('Failed to add product');
        }
      });
    } else {
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: () => {
          this.toasterService.success('Product removed from wishlist');
          this.wishlistLoading[id] = false;
        },
        error: () => {
          this.wishlistLoading[id] = false;
          this.toasterService.error('Failed to remove product');
        }
      });
    }
  }

  addToCart(id: string) {
    this.loading = true;
    this.cartService.addProductToCart({ productId: id }).subscribe({
      next: (res) => {
        this.loading = false;
        this.toasterService.success(res.message);
      },
      error: (err) => {
        this.loading = false;
        this.toasterService.error(err.message);
        console.log(err);
      }
    });
  }
}
