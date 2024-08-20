export class HttpEndPoints {
  public static Account = {
    Login: 'auth/login',
    Refresh: 'account/refresh',
  };

  public static Products = {
    GetOne: 'products/{id}',
    GetAll: 'products',
    GetAllFeatured: 'products/list/featured',
  };
}
