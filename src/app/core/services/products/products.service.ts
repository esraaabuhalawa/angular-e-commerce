import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient)
  //Get all producs
  getAllProducts(filters?: any ,page: number = 1): Observable<any> {
    let params = new HttpParams().set('page', page);

    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key];

        if (Array.isArray(value)) {
          // repeat param for each value (like category[in]=...&category[in]=...)
          value.forEach(v => {
            params = params.append(key, v);
          });
        } else {
          params = params.set(key, value);
        }
      });
    }

    return this.httpClient.get(environment.baseUrl + 'products', { params });
  }
}
