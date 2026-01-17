import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { Subscription } from 'rxjs';
//import { ProductSkeltonComponent } from "../../shared/components/product-skelton/product-skelton.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { Category } from '../../core/models/category.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brand } from '../../core/models/brand.interface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, LoaderComponent, NgxPaginationModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit, OnDestroy {
  productsList: Product[] = [];
  getProducts: Subscription | null = null;
  allCategories: Category[] = [];
  allBrands: Brand[] = [];
  selectedCategory: string = '';
  selectedBrand: string = '';
  categorySub: Subscription | null = null;
  brandSub: Subscription | null = null;
  maxPrice: number = 0;
  minPrice: number = 0;
  sortProducts: string = '';
  currentPage!: number;
  pageSize!: number;
  total!: number;

  isLoading: boolean = false

  private readonly productService = inject(ProductsService);
  private readonly categoryService = inject(CategoriesService);
  private readonly brandsService = inject(BrandsService);
  private readonly route = inject(ActivatedRoute);

  fetchProducts(filters?: any, page: number = 1) {
    this.isLoading = true;
    this.getProducts = this.productService.getAllProducts(filters, page).subscribe(
      {
        next: (res: any) => {
          //console.log(res.data);
          this.productsList = res.data;
          this.currentPage = res.metadata.currentPage;
          this.pageSize = res.metadata.limit;
          this.total = res.results
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

  pageChanged(page: number) {
    console.log(page)
    this.currentPage = page;
    this.fetchProducts({}, page); // pass the new page number
  }
  
  fetchCategories() {
    this.categorySub = this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
        //console.log(this.allCategories)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchBrands() {
    this.brandSub = this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        //  console.log(this.allBrands)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilters() {
    const filters: any = {};

    if (this.selectedBrand) {
      filters['brand'] = this.selectedBrand;  // brand=brandId
    }

    if (this.selectedCategory) {
      // backend expects category[in]=... so we make it an array
      filters['category[in]'] = [this.selectedCategory];
    }

    if (this.minPrice) {
      filters['price[lte]'] = [this.minPrice];  // brand=brandId
    }

    if (this.maxPrice) {
      // backend expects category[in]=... so we make it an array
      filters['price[gte]'] = [this.maxPrice];
    }

    if (this.sortProducts) {
      filters['sort'] = this.searchProducts;
    }

    this.fetchProducts(filters)
  }

  searchProducts(event: Event) {
    const keyword = (event.target as HTMLInputElement).value;
    const filters: any = {};
    if (keyword) {
      filters['keyword'] = keyword;
    }

    this.fetchProducts(filters)
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
    // Reset filters
    this.selectedCategory = '';
    this.selectedBrand ='';

    // Check for category query param
    if (params['category']) {
      this.selectedCategory = params['category'];
    }

    // Check for brand query param
    if (params['brand']) {
      this.selectedBrand = params['brand'];
    }

    // Apply filters if either category or brand exists
    if (this.selectedCategory || this.selectedBrand) {
      this.applyFilters();
    } else {
      // Default fetch if no query params
      this.fetchProducts();
    }
  });

    this.fetchCategories();
    this.fetchBrands();
  }

  ngOnDestroy(): void {
    if (this.getProducts) {
      this.getProducts.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    if (this.brandSub) {
      this.brandSub.unsubscribe();
    }
  }
}
