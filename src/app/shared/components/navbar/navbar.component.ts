import { Component, ElementRef, HostListener, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../core/auth/services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, LanguageSwitcherComponent, TranslateModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService, private eRef: ElementRef, private router: Router) { }

  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  cartCount$ = this.cartService.cartCount$;

  private readonly wishlistService = inject(WishlistService);
  wishlistCount$ = this.wishlistService.wishlistCount$;

  @Input() authPages: boolean = false;

  userData$ = this.userService.user$;

  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.showDropdown && !this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  logout() {
    this.cartService.clearCartCount();
    this.authService.logOut();
  }



  searchTerm: string = '';

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.router.navigate(['/products'], {
      queryParams: {
        keyword: this.searchTerm
      }
    });
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  isOffcanvasOpen = false;

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
  }
}
