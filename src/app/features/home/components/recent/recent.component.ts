import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from "../../../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-recent',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecentComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  productsList: Product[] = [];
  getProducts: Subscription | null = null;
   fetchProducts() {
    this.getProducts = this.productService.getAllProducts().subscribe(
      {
        next: (res:any) => {
          //console.log(res.data);
         this.productsList = res.data.splice(0,10)
        },
        error: (error) => {
          console.log(error)
        },
      }
    )
  }
  ngOnInit(): void {
    this.fetchProducts();
  }
  ngOnDestroy(): void {
    if (this.getProducts) {
      this.getProducts.unsubscribe();
    }
  }

  // @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;

  // ngAfterViewInit() {
  //   const swiperParams: SwiperOptions = {
  //     // Swiper configuration options
  //     // Example:
  //     navigation: true,
  //     pagination: true
  //   };
  //   Object.assign(this.swiperRef.nativeElement, swiperParams);
  //   this.swiperRef.nativeElement.initialize();
  // }
}
