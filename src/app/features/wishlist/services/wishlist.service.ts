import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  // Local state with BehaviorSubject
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  // constructor() {
  //   // Optionally load wishlist once service is created
  //   this.loadWishlist();
  // }

  //Load wishlist from backend
  loadWishlist(): void {
    this.loadingSubject.next(true);
    this.httpClient.get<any>(environment.baseUrl + 'wishlist').subscribe({
      next: (res) => {
        this.loadingSubject.next(false);
        this.wishlistSubject.next(res.data || []);
      },
      error: () => {
          this.loadingSubject.next(false);
        this.wishlistSubject.next([]);
      }
    });
  }


  //Add product to wishlist
  addProductToWishlist(data: { productId: string }): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'wishlist', data).pipe(
      tap(() => this.loadWishlist()) // refresh after add
    );
  }

  //Remove product from wishlist
  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}wishlist/${id}`).pipe(
      tap(() => this.loadWishlist()) // refresh after remove
    );
  }

  //Check if a product is in wishlist (helper)
  isInWishlist(id: string): boolean {
    const current = this.wishlistSubject.value;
    return current.some((item: any) => item.id === id || item.productId === id);
  }
}
