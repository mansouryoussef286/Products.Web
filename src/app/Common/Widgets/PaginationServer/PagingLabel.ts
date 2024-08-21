import { Component, Input } from '@angular/core';
import { RepeaterServer } from './RepeaterServer';

@Component({
  selector: 'PagingLabel',
  template: `
    <span class="table-box-paging-label">
      {{ GetStart() }} - {{ GetEnd() }} {{ 'of' }}
      {{ RepeaterServer.GridOptions.Count }}
      {{ RowLabel + (this.RepeaterServer.GridOptions.Count > 1 ? 's' : '') }}
    </span>
  `,
})
export class PagingLabel {
  @Input() RowLabel: string = 'Row';
  constructor(public RepeaterServer: RepeaterServer) {}

  GetStart() {
    return this.RepeaterServer.start + 1;
  }

  GetEnd() {
    return this.RepeaterServer.end;
  }
}
