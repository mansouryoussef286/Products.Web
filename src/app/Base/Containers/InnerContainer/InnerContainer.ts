import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerContainerRoutes } from './InnerContainer.Routes';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@App/Base/Containers/InnerContainer/Components/Header/Header';
import { FooterComponent } from '@App/Base/Containers/InnerContainer/Components/Footer/Footer';

@Component({
  standalone: true,
  selector: 'inner-container',
  templateUrl: './InnerContainer.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class InnerContainer implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
