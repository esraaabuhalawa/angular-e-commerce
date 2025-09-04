import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.interface';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-similar-products',
  imports: [ProductCardComponent],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimilarProductsComponent implements OnInit {
  @Input() id: string = ''
  private readonly productService = inject(ProductsService);
  productsList: Product[] = [];
  getProducts: Subscription | null = null;

  fetchProducts() {
    const filters: any = {};

    if (this.id) {
      // API expects category[in] for filtering
      filters['category[in]'] = [this.id];
    }

    this.getProducts = this.productService.getAllProducts(filters).subscribe({
      next: (res: any) => {
        this.productsList = res.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
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
