import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../core/models/category.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  imports: [ RouterLink ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesSubscribe: Subscription | null = null;
  private readonly categoryService = inject(CategoriesService);

  ngOnInit(): void {
    this.categoriesSubscribe = this.categoryService.getAllCategories().subscribe({
      next: (res) => this.categories = res.data || [],
      error: (err) => console.log(err)
    });
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscribe) {
      this.categoriesSubscribe.unsubscribe();
    }
  }
}
