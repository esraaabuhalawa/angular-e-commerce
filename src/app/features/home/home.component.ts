import { Component } from '@angular/core';
import { RecentComponent } from "./components/recent/recent.component";
import { HeroComponent } from "./components/hero/hero.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
//import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";


@Component({
  selector: 'app-home',
  imports: [RecentComponent, HeroComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
