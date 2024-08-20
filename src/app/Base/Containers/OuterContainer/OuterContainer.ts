import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OuterContainerRoutes } from './OuterContainer.Routes';

@Component({
  standalone: true,
  selector: 'outer-container',
  template: ` <router-outlet></router-outlet> `,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class OuterContainer implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
