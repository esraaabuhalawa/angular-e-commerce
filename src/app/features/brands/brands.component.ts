import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brand } from '../../core/models/brand.interface';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
@Component({
  selector: 'app-brands',
  imports: [RouterLink, LoaderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  allBrands: Brand[] = [];
  brandSub: Subscription | null = null;
  isLoading:Boolean = false;

  private readonly brandsService = inject(BrandsService);
  fetchBrands() {
    this.isLoading = true;
    this.brandSub = this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.isLoading = false
        this.allBrands = res.data;
        //  console.log(this.allBrands)
      },
      error: (err) => {
         this.isLoading = false
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.fetchBrands();
  }
  OnDestroy(): void{
   if (this.brandSub) {
      this.brandSub.unsubscribe();
    }
  }
}
