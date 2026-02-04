import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}cart`;

  // Cart count subject (starts with 0)
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

    //load cart count
  loadCartCount(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        this.setCartCount(res.numOfCartItems ?? (res.data?.length || 0));
      },
      error: (err) => {
        console.error('Failed to load cart count', err);
        this.setCartCount(0);
      }
    });
  }

  // Update product quantity
  updateProductQuantity(productId: string, payload: object): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, payload);
  }

  //add product to cart
  addProductToCart(payload: { productId: any; }): Observable<any> {
    return this.http.post(this.apiUrl, payload).pipe(
      tap((res: any) => {
        this.setCartCount(res.numOfCartItems ?? 0);
      })
    );
  }

  //remove product from cart
  removeProductFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`).pipe(
      tap((res: any) => {
        this.setCartCount(res.numOfCartItems ?? 0);
      })
    );
  }

    // get current count synchronously
  getCartCount(): number {
    return this.cartCountSubject.value;
  }

  // clear cart count (useful for logout)
  clearCartCount(): void {
    this.cartCountSubject.next(0);
  }

  //clear cart
  clearUserCart(): Observable<any> {
    return this.http.delete(this.apiUrl).pipe(
      tap(() => {
        this.setCartCount(0);
      })
    );
  }

  //get Cart Products
  getCartProducts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((res: any) => {
        this.setCartCount(res.numOfCartItems ?? (res.data?.length || 0));
      })
    );
  }

  //Method to set cart count manually
  setCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  //checkout Session
  checkoutSession(id:string | null,data:object):Observable<any>{
    return   this.http.post(`${environment.baseUrl}orders/checkout-session/${id}?url=http://localhost:4200` , data)
  }

  //creat cash Order
  createCashOrder(id:string | null,data:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}orders/${id}` , data)
  }

  //creat cash Order
  getUserOrders(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}orders/user/${id}`)
  }
}
