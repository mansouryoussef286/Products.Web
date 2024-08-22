import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './ProductsList.html',
  styleUrls: ['ProductsList.scss'],
  imports: [
    CommonModule,
    FormsModule,
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

  SearchInput!: string;
  SelectedCategory: string = '';
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
        this.IsProductsLoaded = true;
        // console.log(productsResponse);

        this.Products = productsResponse.products;
        this.GridOptions = this.ProductsService.GridOptions;
        this.SelectedCategory = this.ProductsService.SelectedCategory;
        this.SearchInput = this.ProductsService.SearchInput;
      }
    );

    this.ProductsService.Categories$.subscribe((categories: Category[]) => {
      this.IsLoaded = true;
      this.Categories = categories;
    });

    this.ProductsService.searchSubject$.subscribe((searchInput) => {
      // if (
      //   searchInput.length <= 2 &&
      //   this.SearchInput.length < searchInput.length
      // )
      //   return;
      // this.SearchInput = searchInput;
      // this.SelectedCategory = '';
      this.SearchInput = this.ProductsService.SearchInput;
    });

    this.Data.GetProducts();
    this.Data.GetCategories();
  }

  Data = {
    GetProducts: () => {
      this.IsProductsLoaded = false;
      this.ProductsService.GetProducts();
    },

    GetCategories: () => {
      this.IsLoaded = false;
      this.ProductsService.GetCategories();
    },
  };

  getNumber(category: string) {
    return this.Products?.filter((p) => p.category == category.toLowerCase())
      .length;
  }

  OnPaginationChange() {
    this.ProductsService.GridOptions = this.GridOptions;
  }

  OnCategoryInputChange(event: any) {
    this.ProductsService.SelectedCategory = event.target.value;
  }
}
