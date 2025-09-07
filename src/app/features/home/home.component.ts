import { Component } from '@angular/core';
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { RecentComponent } from "./components/recent/recent.component";
import { HeroComponent } from "./components/hero/hero.component";
import { FeaturedBrandsComponent } from "./components/featured-brands/featured-brands.component";
import { DeliveryComponent } from "./components/delivery/delivery.component";


@Component({
  selector: 'app-home',
  imports: [PopularCategoriesComponent, RecentComponent, HeroComponent, FeaturedBrandsComponent, DeliveryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
