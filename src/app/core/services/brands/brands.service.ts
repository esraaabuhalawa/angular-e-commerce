import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
    private readonly httpClient = inject(HttpClient);

    // getAllBrands(): Observable<any>{
    //   return this.httpClient.get(environment.baseUrl + 'brands')
    // }

    getAllBrands(page: number = 1, limit: number = 10): Observable<any> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());

      return this.httpClient.get(
        `${environment.baseUrl}brands`,
        { params }
      );
    }

    getSpecificBrand(id:string):Observable<any>{
      return this.httpClient.get(environment.baseUrl + 'brands/' + id)
    }
}
