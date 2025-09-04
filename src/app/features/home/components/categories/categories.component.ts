import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: [] = [];
  categoriesSubscribe: Subscription | null = null;

  private readonly categoriesService = inject(CategoriesService);

  getCategories() {
    this.categoriesSubscribe = this.categoriesService.getAllCategories().subscribe(
      {
        next: (res) => {
         // console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy(): void {
    if(this.categoriesSubscribe){
       this.categoriesSubscribe.unsubscribe();
    }
  }
}
