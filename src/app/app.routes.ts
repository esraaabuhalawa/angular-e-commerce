import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ProductsComponent } from './features/products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  // Redirect root to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Auth routes under "auth"
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // Main app routes
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'products/:slug/:id', component: ProductDetailsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
