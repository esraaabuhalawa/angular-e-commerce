import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient);

  //add Product to wishlist
  addProducttoWishlist(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'wishlist', data)
  }

  //add Product from wishlist
  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}wishlist/${id}`)
  }

  //get user products wishlist
  userWishlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist')
  }
}
