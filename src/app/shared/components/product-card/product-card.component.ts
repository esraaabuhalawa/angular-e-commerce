import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, StarRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) item: Product = {} as Product;

  private readonly wishlistService = inject(WishlistService)
  private readonly toasterService = inject(ToastrService)

    addToWishlist(id: string) {
    this.wishlistService.addProducttoWishlist({ productId: id }).subscribe({
      next: () => {
        this.toasterService.success('Product added to your wishlist');
      },
      // error: (err) => {
      //   if(err.status === 401){
      //     this.toasterService.error('Please, Sign in first');
      //   } else {
      //     console.log('error',err)
      //   }
      // },
    });
  }

  removeFromWishlist(id: string) {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: () => {
        this.toasterService.success('Product is removed from your whislist');
      },
      // error: (err) => {
      //   if(err.status === 401){
      //    this.toasterService.error('Please, Sign in first');
      //   } else {
      //     console.log('error',err)
      //   }
      // },
    });
  }
  addToCart() {
    alert('staart')
  }
}
