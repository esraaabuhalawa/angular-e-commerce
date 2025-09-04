import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-star-rating',
  imports: [NgClass],
  standalone: true,
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() rating: number = 0;          // can be decimal (like 4.8)
  @Input() maxRating: number = 5;
  @Output() ratingChange = new EventEmitter<number>();
  @Input() readonlyCase:boolean = true;

  get stars(): number[] {
    return Array(this.maxRating).fill(0);
  }

  setRating(value: number) {
    if(!this.readonlyCase){
        this.rating = value;
    this.ratingChange.emit(this.rating);
    }
  }

  getStarClass(index: number): string {
    const full = index + 1 <= Math.floor(this.rating);     // full star
    const half = this.rating % 1 !== 0 && index === Math.floor(this.rating); // half star

    if (full) return 'fa-solid text-yellow-400';
    if (half) return 'fa-solid fa-star-half-stroke text-yellow-400';
    return 'fa-regular text-gray-400';
  }
}
