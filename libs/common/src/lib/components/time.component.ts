import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'lib-time',
  template: `
    <div class="d-flex flex-column px-4 fw-{{fw}} text-{{color}} fs-{{fs}} lh-{{lh}}">
      <span class="pb-2">{{time | date:'d MMMM yyyy'}}</span>
      <span>{{time | date:'HH:mm:ss'}}</span>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      display: flex;
      flex: 1;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent implements OnDestroy {
  @Input() color: 'primary' | "secondary" | "light" | 'success' | 'info' | 'warning' | 'danger' | "dark" | 'blue' | 'red' | 'yellow' | 'orange' | 'green' | 'gray-100' | 'gray-200' | 'gray-300' | 'gray-400' | 'gray-500' | 'gray-600' | 'gray-700' | 'gray-800' | 'gray-900' = 'gray-700';
  @Input() fs: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '2x' | '3x' | '4x' | '5x' = '6';
  @Input() fw: 'lighter' | 'light' | 'normal' | 'bold' | 'bolder' | 'boldest' = 'bolder';
  @Input() lh: '0' | '1' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl' = '1';

  public time = new Date();
  private interval: any;

  constructor() {
    this.interval = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
