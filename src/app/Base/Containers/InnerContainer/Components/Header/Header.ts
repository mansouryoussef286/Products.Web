import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CartService } from '@App/Common/Services/cart.service';
import { ProductsService } from '@App/Common/Services/products.service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './Header.html',
  styleUrls: ['./Header.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class HeaderComponent implements OnInit {
  CurrentUser!: AuthModels.CurrentUserResModel;
  RoutePaths = RoutePaths;
  SearchInput!: string;
  CartCount!: number;

  constructor(
    private Router: Router,
    protected AuthService: AuthService,
    protected ProductsService: ProductsService,
    protected CartService: CartService
  ) {}

  ngOnInit(): void {
    this.InitUserSub();
    this.InitCartSub();
    this.InitSearchInputSub();
    this.ProductsService.InitSearchSub();
  }

  InitUserSub() {
    this.CurrentUser = this.AuthService.CurrentUser;

    this.AuthService.CurrentUserSub.subscribe((isExisting) => {
      if (isExisting) {
        this.CurrentUser = this.AuthService.CurrentUser;
      }
    });
  }

  InitCartSub() {
    this.CartService.Cart$.subscribe((c) => {
      this.CartCount = c.totalQuantity;
    });
  }

  InitSearchInputSub() {
    this.ProductsService.ProductsResponse$.subscribe((data) => {
      this.SearchInput = this.ProductsService.SearchInput;
    });
  }

  onSearchInputChange() {
    this.ProductsService.SearchInput = this.SearchInput;
  }
}
