import { Constants } from '@App/Common/Settings/Constants';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './Footer.html',
  styleUrls: ['./Footer.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class FooterComponent {
  Year = Constants.GetYear();
  RoutePaths = RoutePaths;

  constructor() {}

  ngOnInit() {}
}
