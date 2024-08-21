export class HttpEndPoints {
  public static Account = {
    Login: 'auth/login',
    Refresh: 'auth/refresh',
  };

  public static Products = {
    GetOne: 'products/{id}',
    GetAll: 'products',
    Categories: 'products/categories',
    Search: 'products/search?q={query}',
  };
}
