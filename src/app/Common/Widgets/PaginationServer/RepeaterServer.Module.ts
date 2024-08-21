import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RepeaterServer } from './RepeaterServer';
import { SortField } from './SortField';
import { Pagination } from './Pagination';
import { PageSizeOption } from './PageSizeOption';
import { PagingLabel } from './PagingLabel';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
    RepeaterServer,
    SortField,
    Pagination,
    PageSizeOption,
    PagingLabel,
    PaginationComponent,
  ],
  providers: [],
  exports: [RepeaterServer, SortField, Pagination, PageSizeOption, PagingLabel],
})
export class RepeaterServerModule {}
