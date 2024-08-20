import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
// import { NotifyService } from '@App/Common/Services/Notify.Service';
// import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import {
  StorageEnum,
  StorageService,
} from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
// import { CourseCardComponent } from './CourseCard/CourseCard';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
// import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { ProductModels } from '@App/Common/Models/Product.Models';
import { ProductCardComponent } from './CourseCard/ProductCard';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
// import { CourseModels } from '@App/Common/Models/Course.Models';
// import { CourseTypeEnum } from '@App/Common/Enums/CourseType.Enum';
// import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';

@Component({
  standalone: true,
  templateUrl: './ProductsList.html',
  styleUrls: ['ProductsList.scss'],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ProductCardComponent,
    // CourseCardComponent,
    LoaderComponent,
    // StarRatingComponent,
  ],
})
export class ProductsListComponent implements OnInit {
  // RoutePaths = RoutePaths;
  // courseTypes = Object.keys(CourseTypeEnum);
  // courseTypesValues = Object.values(CourseTypeEnum);

  // Filter!: CourseModels.Filter;
  Products!: ProductModels.Product[];
  IsLoaded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpService: HttpService,
    // private ErrorCodesService: ErrorCodesService,
    // private NotifyService: NotifyService,
    // private AuthService: AuthService,
    private StorageService: StorageService
  ) {}

  ngOnInit() {
    this.Data.GetProducts();
  }

  Data = {
    GetProducts: () => {
      this.IsLoaded = false;
      // console.log(this.Filter);
      // if (!this.Filter) {
      // 	this.Filter = this.StorageService.GetLocalStorage<CourseModels.Filter>(StorageEnum.CoursesFilter);
      // 	// no filter in storage
      // 	if (Object.keys(this.Filter).length == 0) {
      // 		this.Filter = new CourseModels.Filter();
      // 		// console.log('get filter from code', this.Filter);
      // 	} else {
      // 		// console.log('get filter from storage', this.Filter);
      // 	}
      // }

      let endPoint = HttpEndPoints.Products.GetAll;
      this.HttpService.Get<ProductModels.ApiResponse>(endPoint).subscribe(
        (data) => {
          this.IsLoaded = true;
          this.Products = data.products;
        }
      );
    },
  };
}
