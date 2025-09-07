import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-featured-brands',
  imports: [ RouterLink],
  templateUrl: './featured-brands.component.html',
  styleUrl: './featured-brands.component.scss'
})
export class FeaturedBrandsComponent implements OnInit, OnDestroy {
  allCategories: Category[] = [];
  selectedCategory: string = '';
  categorySub: Subscription | null = null;

  private readonly categoryService = inject(CategoriesService);


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

  ngOnInit(): void {
    this.fetchCategories();
  }

  ngOnDestroy(): void {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }
}
