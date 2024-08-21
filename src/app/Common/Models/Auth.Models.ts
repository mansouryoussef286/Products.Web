export namespace AuthModels {
  export class LoginReqModel {
    username!: string;
    password!: string;
    expiresInMins!: number;
  }

  export class RefreshTokenReqModel {
    refreshToken!: string;
    expiresInMins!: number;
  }

  export class CurrentUserResModel {
    id!: number;
    username!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    image!: string;
    token!: string;
    refreshToken!: string;
  }

  export class RefreshTokenResModel {
    token!: string;
    refreshToken!: string;
  }

  export class LoginModel {
    constructor(public username: string, public password: string) {}
  }
}
