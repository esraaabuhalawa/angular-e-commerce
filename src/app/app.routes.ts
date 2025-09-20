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
import { BrandsComponent } from './features/brands/brands.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { AllOrdersComponent } from './features/all-orders/all-orders.component';

export const routes: Routes = [
  // Redirect root to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Auth routes under "auth"
   {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login', canActivate: [isLoggedGuard] },
      { path: 'register', component: RegisterComponent, title: 'Register', canActivate: [isLoggedGuard]  },
      { path: 'forget-password', component: ForgetPasswordComponent, title: 'Forget Password', canActivate: [isLoggedGuard]  }
    ]
  },

  // Main app routes
 {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' , canActivate: [authGuard] },
      { path: 'products', component: ProductsComponent, title: 'Products',canActivate: [authGuard] },
      { path: 'products/:id', component: ProductDetailsComponent, title: 'Product Details' ,canActivate: [authGuard]},
      { path: 'products/:slug/:id', component: ProductDetailsComponent, title: 'Product Details',canActivate: [authGuard] },
      { path: 'brands', component: BrandsComponent, title: 'Brands',canActivate: [authGuard]},
      { path: 'categories', component: CategoriesComponent, title: 'Categories',canActivate: [authGuard] },
      { path: 'cart', component: CartComponent, title: 'Cart' , canActivate: [authGuard]},
      { path: 'allorders', component: AllOrdersComponent, title: 'All Orders' , canActivate: [authGuard]},
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' , canActivate: [authGuard] },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout' , canActivate: [authGuard] },
      { path: '**', component: NotFoundComponent, title: 'Not Found' }
    ]
  }
  //{ path: '**', component: NotFoundComponent }
];
