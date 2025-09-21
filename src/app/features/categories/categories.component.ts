import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../core/models/category.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
@Component({
  selector: 'app-categories',
  imports: [RouterLink, LoaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categoriesSubscribe: Subscription | null = null;
  isLoading:Boolean = false;

  private readonly categoryService = inject(CategoriesService);

  getCategories(){
    this.isLoading = true;
    this.categoriesSubscribe = this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.categories = res.data || []
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err)
      }
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscribe) {
      this.categoriesSubscribe.unsubscribe();
    }
  }
}
