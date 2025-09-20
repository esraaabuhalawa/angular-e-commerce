import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  signUp(UserData: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', UserData)
  }
  signIn(userData: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', userData)
  }

  logOut() {
    this.userService.clearUser();
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.delete('authToken');
      this.router.navigate(['/auth/login']);
    }
  }

  decodeToken(){
    let token;
    try {
      token = jwtDecode(this.cookieService.get('authToken'));
    } catch (error) {
      this.logOut();
    }
    return token;
  }

  //forget PAssword
  forgetPassword(payload:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPasswords`,payload)
  }

  //verify code
  verifyResetcode(payload:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}auth/verifyResetCode`,payload)
  }

  //Reset PAss
  resetPass(payload:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}auth/resetPassword`,payload)
  }
}
