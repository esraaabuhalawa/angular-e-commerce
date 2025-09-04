import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  signUp(UserData:object):Observable<any>{
   return this.httpClient.post(environment.baseUrl + 'auth/signup' , UserData)
  }
  signIn(userData:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'auth/signin' , userData)
  }
}
