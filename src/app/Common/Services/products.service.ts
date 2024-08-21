import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModels } from '../Models/Product.Models';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  ProductsResponse$ = new Subject<ProductModels.ApiResponse>();
  private ProductsResponse!: ProductModels.ApiResponse;
  searchSubject = new Subject<string>();

  constructor(private HttpService: HttpService) {}

  SetProducts(response: ProductModels.ApiResponse) {
    this.ProductsResponse = response;
    this.ProductsResponse$.next(this.ProductsResponse);
  }

  InitSearchSub() {
    this.searchSubject
      .pipe(
        // Wait until typing has stopped for 300ms
        debounceTime(300),
        // Only emit if the input has changed
        distinctUntilChanged(),
        // Only proceed if the input string has more than 2 characters
        filter((query: string) => query.length > 2 || query == ''),
        // Cancel the previous request and switch to the new one
        switchMap((query: string) => this.search(query))
      )
      .subscribe((response: ProductModels.ApiResponse) => {
        // Handle the response from the server
        this.SetProducts(response);
      });
  }

  search(query: string) {
    let endPoint = HttpEndPoints.Products.Search;
    endPoint = endPoint.replace('{query}', query);
    return this.HttpService.Get<ProductModels.ApiResponse>(endPoint);
  }
}
