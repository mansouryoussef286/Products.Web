import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
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

  constructor(private Router: Router, protected AuthService: AuthService) {}

  ngOnInit(): void {
    this.CurrentUser = this.AuthService.CurrentUser;

    this.AuthService.CurrentUserSub.subscribe((isExisting) => {
      if (isExisting) {
        this.CurrentUser = this.AuthService.CurrentUser;
      }
    });
  }

  signOut() {
    this.AuthService.SignOut();
    this.Router.navigate([RoutePaths.Login]);
  }
}
