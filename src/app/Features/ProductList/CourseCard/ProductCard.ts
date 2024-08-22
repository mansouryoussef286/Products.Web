import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '@App/Common/Services/Http.Service';
import { ProductModels } from '@App/Common/Models/Product.Models';
import { CartService } from '@App/Common/Services/cart.service';

@Component({
  standalone: true,
  templateUrl: './ProductCard.html',
  styleUrls: ['ProductCard.scss'],
  selector: 'app-product-card',
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ProductCardComponent implements OnInit {
  @Input('Product') Product!: ProductModels.Product;
  RoundedPrice!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private CartService: CartService
  ) {}

  ngOnInit() {
    let num = (
      (this.Product.price * (100 - this.Product.discountPercentage)) /
      100
    ).toString();
    this.RoundedPrice = parseFloat(num).toFixed(2);
  }

  AddToCart() {
    this.CartService.AddToCart(this.Product);
  }
}
