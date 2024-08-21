import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpService } from '@App/Common/Services/Http.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
// import { NotifyService } from '@App/Common/Services/Notify.Service';
import { AuthService } from '@App/Common/Services/Auth.Service';

import { RoutePaths } from '@App/Common/Settings/RoutePaths';
// import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
import { CommonModule } from '@angular/common';
import { Constants } from '@App/Common/Settings/Constants';
import { ErrorCodesEnum } from '@App/Common/Enums/ErrorCodes.Enum';
// import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
// import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './Login.html',
  styleUrls: ['./Login.scss'],
})
export class LoginComponent {
  RoutePaths = RoutePaths;
  Year = Constants.GetYear();

  Error!: string;
  showPW: boolean = false;
  PWInputType: string = 'password';

  Credentials = new AuthModels.LoginModel('', '');
  ReturnUrl: any;

  constructor(
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private HttpService: HttpService, // private NotifyService: NotifyService,
    private AuthService: AuthService // private socialAuthService: SocialAuthService, // private ErrorCodesService: ErrorCodesService,
  ) {}

  async ngOnInit() {
    this.AuthService.SignOut();
  }

  Login(frm: NgForm) {
    if (frm.invalid) {
      this.Error = ErrorCodesEnum.FILL_REQUIRED_FIELDS;
      return;
    }

    let requestModel = {
      username: this.Credentials.username.trim(),
      password: this.Credentials.password.trim(),
      expiresInMins: 1,
    } as AuthModels.LoginReqModel;

    this.ReturnUrl = this.ActivatedRoute.snapshot.queryParams['returnUrl'];

    let httpEndPoint = HttpEndPoints.Account.Login;
    this.HttpService.Post<
      AuthModels.LoginReqModel,
      AuthModels.CurrentUserResModel
    >(httpEndPoint, requestModel).subscribe({
      next: (response) => {
        // console.log(response);
        this.AuthService.SignIn(response);

        const route = !!this.ReturnUrl ? this.ReturnUrl : RoutePaths.Products;
        this.Router.navigateByUrl(route);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.Error = errorResponse.error.Message;
      },
    });
  }
}
