export namespace ProductModels {
  export class ApiResponse {
    products!: Product[];
    total!: number;
    skip!: number;
    limit!: number;
  }

  export class Product {
    id!: number;
    title!: string;
    description!: string;
    category!: string;
    price!: number;
    discountPercentage!: number;
    rating!: number;
    stock!: number;
    tags!: string[];
    brand!: string;
    sku!: string;
    weight!: number;
    dimensions!: Dimensions;
    warrantyInformation!: string;
    shippingInformation!: string;
    availabilityStatus!: string;
    reviews!: Review[];
    returnPolicy!: string;
    minimumOrderQuantity!: number;
    meta!: Meta;
    thumbnail!: string;
    images!: string[];
  }

  export class Meta {
    createdAt!: string;
    updatedAt!: string;
    barcode!: string;
    qrCode!: string;
  }

  export class Review {
    rating!: number;
    comment!: string;
    date!: string;
    reviewerName!: string;
    reviewerEmail!: string;
  }

  export class Dimensions {
    width!: number;
    height!: number;
    depth!: number;
  }
}
