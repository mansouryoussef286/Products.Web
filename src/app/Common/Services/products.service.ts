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
import { Category } from '../Models/Category.Models';
import {
  GridOptionsModel,
  SortOrderEnum,
} from '../Widgets/PaginationServer/GridOptionsModel';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  ProductsResponse$ = new Subject<ProductModels.ApiResponse>();
  private productsResponse!: ProductModels.ApiResponse;
  set ProductsResponse(response: ProductModels.ApiResponse) {
    this.productsResponse = response;
    this.GridOptions.Count = response.total;
    this.ProductsResponse$.next(this.productsResponse);
  }

  Categories$ = new Subject<Category[]>();
  private categories!: Category[];
  set Categories(response: Category[]) {
    this.categories = response;
    this.Categories$.next(this.categories);
  }

  searchSubject$ = new Subject<string>();
  private searchInput: string = '';
  set SearchInput(value: string) {
    this.searchInput = value;
    this.searchSubject$.next(this.searchInput);
  }
  get SearchInput() {
    return this.searchInput;
  }

  private selectedCategory!: string;
  set SelectedCategory(value: string) {
    this.selectedCategory = value == 'All' ? '' : value;
    this.GetProducts();
    this.searchInput = '';
  }
  get SelectedCategory() {
    return this.selectedCategory;
  }

  private gridOptions: GridOptionsModel = new GridOptionsModel(
    '',
    SortOrderEnum.Asc
  );
  set GridOptions(value: GridOptionsModel) {
    this.searchInput = '';
    this.gridOptions = value;
    this.GetProducts();
  }
  get GridOptions() {
    return this.gridOptions;
  }

  constructor(private HttpService: HttpService) {}

  InitSearchSub() {
    this.searchSubject$
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
        this.ProductsResponse = response;
      });
  }

  search(query: string) {
    // set private criteria to null to reset it
    this.selectedCategory = '';
    this.gridOptions = new GridOptionsModel('', SortOrderEnum.Asc);

    // get searched products
    let endPoint = HttpEndPoints.Products.Search;
    endPoint = endPoint.replace('{query}', query);
    return this.HttpService.Get<ProductModels.ApiResponse>(endPoint);
  }

  GetProducts() {
    let category = '';
    if (this.SelectedCategory) category = `/category/${this.SelectedCategory}`;

    let queryParam = this.GetProductsQueryParam();

    let endPoint = HttpEndPoints.Products.GetAll + category + queryParam;
    this.HttpService.Get<ProductModels.ApiResponse>(endPoint).subscribe(
      (response) => {
        this.ProductsResponse = response;
      }
    );
  }

  GetCategories() {
    let endPoint = HttpEndPoints.Products.Categories;
    this.HttpService.Get<Category[]>(endPoint).subscribe((response) => {
      this.Categories = response;
    });
  }

  GetProductsQueryParam(): string {
    let queryParam = '?';
    if (this.GridOptions.PageSize)
      queryParam += `limit=${this.GridOptions.PageSize}&`;
    if (this.GridOptions.PageIndex)
      queryParam += `skip=${
        this.GridOptions.PageSize * this.GridOptions.PageIndex
      }&`;
    if (this.GridOptions.SortField)
      queryParam += `sortBy=${this.GridOptions.SortField}&order=${this.GridOptions.SortOrder}`;
    return queryParam;
  }
}
