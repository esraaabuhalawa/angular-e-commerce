import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
    private readonly httpClient = inject(HttpClient);

    getAllBrands(): Observable<any>{
      return this.httpClient.get(environment.baseUrl + 'brands')
    }

    getSpecificBrand(id:string):Observable<any>{
      return this.httpClient.get(environment.baseUrl + 'brands/' + id)
    }
}
