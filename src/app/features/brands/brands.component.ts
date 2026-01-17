import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brand } from '../../core/models/brand.interface';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-brands',
  imports: [RouterLink, LoaderComponent ,NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  allBrands: Brand[] = [];
  brandSub: Subscription | null = null;
  isLoading:Boolean = false;
  // currentPage!: number;
  // pageSize!: number;
  // total!: number;
currentPage: number = 1;
pageSize: number = 10;
total: number = 0;

  private readonly brandsService = inject(BrandsService);
  // fetchBrands(page: number = 1) {
  //   this.isLoading = true;
  //   this.brandSub = this.brandsService.getAllBrands().subscribe({
  //     next: (res) => {
  //       this.isLoading = false
  //       this.allBrands = res.data;
  //       this.currentPage = res.metadata.currentPage;
  //       this.pageSize = res.metadata.limit;
  //       this.total = res.results
  //       //  console.log(this.allBrands)
  //     },
  //     error: (err) => {
  //        this.isLoading = false
  //       console.log(err)
  //     }
  //   })
  // }

  fetchBrands(page: number = 1) {
  this.isLoading = true;

  this.brandSub = this.brandsService.getAllBrands(page, this.pageSize).subscribe({
    next: (res) => {
      this.isLoading = false;

      this.allBrands = res.data;
      this.currentPage = res.metadata.currentPage;
      this.pageSize = res.metadata.limit;
      this.total = res.results;
    },
    error: (err) => {
      this.isLoading = false;
      console.error(err);
    }
  });
}

pageChanged(page: number) {
  this.currentPage = page;
  this.fetchBrands(page);
}
  // pageChanged(page: number) {
  //   console.log(page)
  //   this.currentPage = page;
  //   this.fetchBrands(page); // pass the new page number
  // }

  ngOnInit(): void {
    this.fetchBrands();
  }
  OnDestroy(): void{
   if (this.brandSub) {
      this.brandSub.unsubscribe();
    }
  }
}
