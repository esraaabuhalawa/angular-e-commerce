import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private cookieService = inject(CookieService);
  
  user$: Observable<User | null> = this.userSubject.asObservable();
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  // set user after login
  setUser(user: User): void {
    this.userSubject.next(user);
  }

  // clear user (logout)
  clearUser(): void {
    this.userSubject.next(null);
  }

  // get current user snapshot
  get currentUser(): User | null {
    return this.userSubject.value;
  }

  private readonly http = inject(HttpClient)
  /** Fetch user using backend verify token endpoint */
  loadUserFromToken() {
    let token;
    if (isPlatformBrowser(this.platformId)) {
      token = this.cookieService.get('authToken')
      //token = localStorage.getItem('authToken');
    }
    if (token) {
      this.http.get<any>('https://ecommerce.routemisr.com/api/v1/auth/verifyToken').subscribe({
        next: (res) => {
          // assuming backend responds with { user: {...} }
          this.userSubject.next(res.decoded);
        },
        error: () => this.clearUser()
      });
    }
  }
}
