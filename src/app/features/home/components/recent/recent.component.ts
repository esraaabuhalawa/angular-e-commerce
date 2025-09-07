import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from "../../../../shared/components/product-card/product-card.component";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-recent',
  imports: [CommonModule, ProductCardComponent, CarouselModule, RouterLink],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss',
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecentComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  productsList: Product[] = [];
  getProducts: Subscription | null = null;
  fetchProducts() {
    this.getProducts = this.productService.getAllProducts().subscribe(
      {
        next: (res: any) => {
          //console.log(res.data);
          this.productsList = res.data.splice(0, 10)
        },
        error: (error) => {
          console.log(error)
        },
      }
    )
  }

  customOptions: OwlOptions = {
    loop: true,                     // infinite looping
    autoplay: true,                 // enable auto play
    autoplayTimeout: 6000,          // 3s per slide
    autoplayHoverPause: true,
    smartSpeed: 1000,                 // 👈 smooth transition speed
    animateOut: 'fadeOut',           // 👈 optional smooth fade
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 20,                      // 👈 margin between items
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'], 
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      1200: {
        items: 4
      },
    },
    nav: true
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
  ngOnDestroy(): void {
    if (this.getProducts) {
      this.getProducts.unsubscribe();
    }
  }

}
