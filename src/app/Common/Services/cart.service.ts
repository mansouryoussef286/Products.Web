import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Subject } from 'rxjs';
import { ProductModels } from '../Models/Product.Models';
import { CartModels } from '../Models/Cart.Models';
import { HttpEndPoints } from '../Settings/HttpEndPoints';
import { HttpService } from './Http.Service';
import { AuthService } from './Auth.Service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  Cart$ = new BehaviorSubject<CartModels.Cart>(new CartModels.Cart());

  get Cart(): CartModels.Cart {
    return this.Cart$.getValue();
  }

  constructor(
    private HttpService: HttpService,
    private AuthService: AuthService
  ) {
    this.InitUserSub();
  }

  private InitUserSub() {
    this.AuthService.CurrentUserSub.subscribe((isExisting) => {
      if (isExisting) {
        this.GetCart();
      }
    });

    if (this.AuthService.IsAuthenticated) {
      // to avoid the racing condition in the app start where whether its added on
      // static loaded header component on this service constructor
      // the get request is done befor api url is set
      setTimeout(() => {
        this.GetCart();
      }, 200);
    }
  }

  private GetCart() {
    let endPoint = HttpEndPoints.Cart.Get;
    endPoint = endPoint.replace(
      '{id}',
      this.AuthService.CurrentUser.id.toString()
    );

    this.HttpService.Get<CartModels.ApiResponse>(endPoint).subscribe(
      (response) => {
        console.log(response);

        this.Cart$.next(response.carts[0]);
      }
    );
  }

  AddToCart(product: ProductModels.Product): void {
    let endPoint = HttpEndPoints.Cart.Update;
    endPoint = endPoint.replace('{id}', this.Cart.id.toString());

    let reqModel = new CartModels.ReqModel();
    reqModel.merge = true;
    reqModel.products = [new CartModels.ProductReqModel(product.id, 1)];
    console.log(reqModel);

    this.HttpService.Put2<CartModels.ReqModel, CartModels.Cart>(
      endPoint,
      reqModel
    ).subscribe((response) => {
      console.log(response);

      this.Cart$.next(response);
      alert(`Added one "${product.title}" to your cart!`);
    });
  }

  private AddToCartOnServer(product: ProductModels.Product) {
    let endPoint = HttpEndPoints.Cart.Update;
    endPoint = endPoint.replace('{id}', this.Cart.id.toString());

    let reqModel = new CartModels.ReqModel();
    reqModel.merge = true;
    reqModel.products = [new CartModels.ProductReqModel(product.id, 1)];
    console.log(reqModel);

    return this.HttpService.Put2<CartModels.ReqModel, CartModels.Cart>(
      endPoint,
      reqModel
    );
  }
}
