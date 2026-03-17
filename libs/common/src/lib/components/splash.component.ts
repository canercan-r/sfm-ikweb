import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@cv-services/shared.service';

@Component({
  selector: 'lib-splash',
  template: `
    <div class="splash-content" #splash>
      <ng-container *ngTemplateOutlet="tempSplash"></ng-container>

      <ng-template #tempSplash>
        <ng-content select="[splash]"></ng-content>
      </ng-template>
    </div>
  `,
  styles: [`
    :host ::ng-deep {

     }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent implements OnInit {
  @ViewChild('splash', { static: true }) splash: ElementRef<HTMLElement>;
  @Input() isSplash = false;
  @Input() delay = 4000;
  @Input() link = '/auth/login';

  constructor(
    private _router: Router,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isSplash ?
      this.hideSplash() : this.noneSplash();
  }

  hideSplash() {
    setTimeout(() => {
      this.splash.nativeElement.classList.add('splash-hidden');
      this._router.navigate([`${this.link}`], {
        queryParams: {},
      });
    }, this.delay)
  }

  noneSplash() {
    setTimeout(() => {
      this.splash.nativeElement.classList.add('splash-hidden');
    }, this.delay)
  }
}
