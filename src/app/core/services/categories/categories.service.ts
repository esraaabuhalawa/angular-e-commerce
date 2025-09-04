import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private readonly httpClient = inject(HttpClient);

    getAllCategories():Observable<any> {
      return this.httpClient.get(environment.baseUrl + 'categories')
    }
}
