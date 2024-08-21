import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() collectionSize = 0; // Total items
  @Input() pageSize = 10; // Items per page
  @Input() page = 0; // Current page
  @Input() maxSize = 2; // Maximum pages to show at once
  @Input() boundaryLinks = false; // Show first/last buttons
  @Input() ellipses = true; // Show ellipses

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  get pageNumbers(): number[] {
    const pages = [];
    const startPage = Math.max(1, this.page - this.maxSize + 1);
    const endPage = Math.min(this.totalPages, this.page + this.maxSize);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(newPage: number) {
    if (newPage !== this.page && newPage > 0 && newPage <= this.totalPages) {
      this.page = newPage;
      this.pageChange.emit(this.page - 1);
    }
  }
}
