import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';
import { StarRatingComponent } from "../star-rating/star-rating.component";


@Component({
  selector: 'app-product-card',
  imports: [RouterLink, StarRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({required:true}) item:Product = {} as Product;
  addToCart(){
    alert('staart')
  }
}
