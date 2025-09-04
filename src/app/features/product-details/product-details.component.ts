import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductDetailsService } from './services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { StarRatingComponent } from "../../shared/components/star-rating/star-rating.component";
import { SimilarProductsComponent } from "../../shared/components/similar-products/similar-products.component";

@Component({
  selector: 'app-product-details',
  imports: [LoaderComponent, StarRatingComponent, SimilarProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  product: Product = {} as Product
  fetchData: Subscription | null = null;
  fetchId: Subscription | null = null;
  isLoading: boolean = false
 selectedImage: string | null = null;

  private readonly productDetailService = inject(ProductDetailsService);
  private readonly activateRoute = inject(ActivatedRoute);

  getPageRoute() {
    this.fetchId = this.activateRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')
      },
    })
  }

changeImageSrc(image: string) {
  this.selectedImage = image;
}

  fetchProductDetails() {
    this.isLoading = true;
    this.fetchData = this.productDetailService.getProduct(this.id).subscribe({
      next: (res) => {
        this.product = res.data;
        this.selectedImage = this.product.imageCover;
      },
      error: (error) => {
        this.isLoading = false; // stop loading if error
        console.log(error)
      },
      complete: () => {
        this.isLoading = false; // stop loading after completion
      },
    })
  }

   sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize: string = 'M';   // default selected size
  quantity: number = 1;

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  ngOnInit(): void {
    this.getPageRoute();
    this.fetchProductDetails();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.fetchId?.unsubscribe()
    this.fetchData?.unsubscribe();
  }
}
