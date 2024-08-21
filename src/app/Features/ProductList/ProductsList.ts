import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  StorageEnum,
  StorageService,
} from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { ProductModels } from '@App/Common/Models/Product.Models';
import { ProductCardComponent } from './CourseCard/ProductCard';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { Category } from '@App/Common/Models/Category.Models';
import { RepeaterServerModule } from '@App/Common/Widgets/PaginationServer/RepeaterServer.Module';
import {
  GridOptionsModel,
  SortOrderEnum,
} from '@App/Common/Widgets/PaginationServer/GridOptionsModel';
import { ProductsService } from '@App/Common/Services/products.service';

@Component({
  standalone: true,
  templateUrl: './ProductsList.html',
  styleUrls: ['ProductsList.scss'],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ProductCardComponent,
    LoaderComponent,
    RepeaterServerModule,
  ],
})
export class ProductsListComponent implements OnInit {
  Products?: ProductModels.Product[];
  Categories!: Category[];
  IsLoaded: boolean = false;
  IsProductsLoaded: boolean = false;

  GridOptions: GridOptionsModel = new GridOptionsModel('', SortOrderEnum.Asc);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private StorageService: StorageService,
    private ProductsService: ProductsService
  ) {}

  ngOnInit() {
    this.ProductsService.ProductsResponse$.subscribe(
      (productsResponse: ProductModels.ApiResponse) => {
        this.Products = productsResponse.products;
        this.GridOptions.Count = productsResponse.total;
      }
    );
    this.Data.GetProducts();
    this.Data.GetCategories();
  }

  Data = {
    GetProducts: (queryParam?: string) => {
      this.IsProductsLoaded = false;
      let endPoint = HttpEndPoints.Products.GetAll + (queryParam ?? '');
      this.HttpService.Get<ProductModels.ApiResponse>(endPoint).subscribe(
        (data) => {
          this.IsProductsLoaded = true;
          this.Products = data.products;
          this.GridOptions.Count = data.total;
        }
      );
    },

    GetCategories: () => {
      this.IsLoaded = false;
      let endPoint = HttpEndPoints.Products.Categories;
      this.HttpService.Get<Category[]>(endPoint).subscribe((data) => {
        this.IsLoaded = true;
        this.Categories = data;
      });
    },

    OnPaginationChange: () => {
      let queryParam = '?';
      if (this.GridOptions.PageSize)
        queryParam += `limit=${this.GridOptions.PageSize}&`;
      if (this.GridOptions.PageIndex)
        queryParam += `skip=${
          this.GridOptions.PageSize * this.GridOptions.PageIndex
        }&`;
      if (this.GridOptions.SortField)
        queryParam += `sortBy=${this.GridOptions.SortField}&order=${this.GridOptions.SortOrder}`;

      this.Data.GetProducts(queryParam);
    },
  };

  getNumber(category: string) {
    return this.Products?.filter((p) => p.category == category.toLowerCase())
      .length;
  }
}
