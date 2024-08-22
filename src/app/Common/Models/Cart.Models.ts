export namespace CartModels {
  export class ApiResponse {
    carts!: Cart[];
    total!: number;
    skip!: number;
    limit!: number;
  }

  export class Cart {
    id!: number;
    products!: Product[];
    total!: number;
    discountedTotal!: number;
    userId!: number;
    totalProducts!: number;
    totalQuantity!: number;
  }

  export class Product {
    id!: number;
    title!: string;
    price!: number;
    quantity!: number;
    total!: number;
    discountPercentage!: number;
    discountedTotal!: number;
    thumbnail!: string;
  }

  export class ReqModel {
    merge!: boolean;
    products!: ProductReqModel[];
  }

  export class ProductReqModel {
    constructor(public id: number, public quantity: number) {}
  }
}
