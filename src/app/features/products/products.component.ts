import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { Subscription } from 'rxjs';
//import { ProductSkeltonComponent } from "../../shared/components/product-skelton/product-skelton.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, LoaderComponent,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsList: Product[] = [];
  getProducts: Subscription | null = null;


  isLoading: boolean = false
  // constructor(private productService: ProductsService) {
  // }

  private readonly productService = inject(ProductsService)
  fetchProducts() {
    this.isLoading = true;
    this.getProducts = this.productService.getAllProducts().subscribe(
      {
        next: (res:any) => {
          //console.log(res.data);
         this.productsList = res.data
        },
        error: (error) => {
          this.isLoading = false; // stop loading if error
          console.log(error)
        },
        complete: () => {
          this.isLoading = false; // stop loading after completion
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
}
