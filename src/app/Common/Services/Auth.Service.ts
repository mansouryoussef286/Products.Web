import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';

import { StorageService, StorageEnum } from './Storage.Service';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';
import { AuthModels } from '../Models/Auth.Models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  CurrentUserSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  ProfilePicUpdate: Subject<any> = new Subject();

  constructor(
    private StorageService: StorageService,
    private HttpService: HttpService
  ) {}

  SignIn(loginResModel: AuthModels.CurrentUserResModel) {
    this.StorageService.SetLocalStorage(
      StorageEnum.AccessToken,
      loginResModel.token
    );
    this.StorageService.SetLocalStorage(
      StorageEnum.RefreshToken,
      loginResModel.refreshToken
    );
    this.StorageService.SetLocalStorage(StorageEnum.CurrentUser, loginResModel);
    this.CurrentUserSub.next(true);
  }

  SignOut() {
    this.StorageService.RemoveLocalStorage(StorageEnum.AccessToken);
    this.StorageService.RemoveLocalStorage(StorageEnum.RefreshToken);
    this.StorageService.RemoveLocalStorage(StorageEnum.CurrentUser);
  }

  get AccessToken(): string {
    let token = this.StorageService.GetLocalStorage<string>(
      StorageEnum.AccessToken
    );
    if (Object.keys(token).length == 0) return '';
    return token;
  }

  set AccessToken(value) {
    this.StorageService.SetLocalStorage(StorageEnum.AccessToken, value);
  }

  get RefreshToken(): string {
    let token = this.StorageService.GetLocalStorage<string>(
      StorageEnum.RefreshToken
    );
    if (Object.keys(token).length == 0) return '';
    return token;
  }

  set RefreshToken(value) {
    this.StorageService.SetLocalStorage(StorageEnum.RefreshToken, value);
  }

  get CurrentUser(): AuthModels.CurrentUserResModel {
    return this.StorageService.GetLocalStorage<AuthModels.CurrentUserResModel>(
      StorageEnum.CurrentUser
    );
  }

  get IsAuthenticated(): boolean {
    return Object.keys(this.CurrentUser).length != 0 ? true : false;
  }

  RefreshAccessToken(): any {
    // let requestModel: AuthModels.RefreshTokenReqModel = {
    //   Id: this.CurrentUser.id,
    //   AccessToken: this.AccessToken,
    //   RefreshToken: this.RefreshToken,
    // };
    // if (!requestModel.AccessToken || !requestModel.RefreshToken) return;
    // let httpEndPoint = HttpEndPoints.Account.Refresh;
    // return this.HttpService.Post<
    //   AuthModels.RefreshTokenReqModel,
    //   AuthModels.RefreshTokenResModel
    // >(httpEndPoint, requestModel).pipe(
    //   tap((data) => {
    //     console.log('access token refreshed');
    //     this.SignIn(data);
    //   })
    // );
  }
}
