import { Component, Input } from '@angular/core';
import { ColorType } from '@lib-common';

@Component({
  selector: 'ikweb-hint',
  template: `
    <div
      class="py-1 text-{{color}}"
    >
      <igx-hint [position]="position">
        {{ message | translate }}
      </igx-hint>
    </div>
  `,
  styles: [``],
})
export class HintComponent {
  @Input() message: string;
  @Input() color: ColorType;
  @Input() position: 'start' | 'end' = 'start';
}
