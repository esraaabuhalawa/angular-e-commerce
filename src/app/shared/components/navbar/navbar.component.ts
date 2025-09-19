import { Component, ElementRef, HostListener, Inject, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../core/auth/services/user.service';
import { CommonModule} from '@angular/common';
import { AuthService } from '../../../core/auth/services/auth.service';
// import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService,  private eRef: ElementRef) { }

  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  // private readonly router = inject(Router);
  // private readonly cookieService = inject(CookieService);

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
    this.authService.logOut();
    // this.userService.clearUser();
    // if (isPlatformBrowser(this.platformId)) {
    //   //localStorage.removeItem('authToken');
    //   this.cookieService.delete('authToken');
    //   this.router.navigate(['/auth/login']);
    // }
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
