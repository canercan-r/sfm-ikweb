import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnInit } from '@angular/core';

const ESCAPE_KEY = 'Escape';

@Component({
  selector: 'lib-fullscreen',
  template: `
    <div class="btn btn-icon btn-color-{{colorInverse}} btn-active-icon-{{color}} btn-active-light-{{color}} w-{{w}} h-{{h}} w-md-{{wmd}} h-md-{{hmd}}"
      (click)="toggleFullscreen()">
      <i class="fa-regular fa-{{screenMode}} fs-{{size}}"></i>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullscreenComponent implements OnInit {
  @Input() color: 'primary' | "secondary" | "light" | 'success' | 'info' | 'warning' | 'danger' | "dark" | 'blue' | 'red' | 'yellow' | 'orange' | 'green' = 'primary';
  @Input() colorInverse: 'primary' | "secondary" | "light" | 'success' | 'info' | 'warning' | 'danger' | "dark" | 'blue' | 'red' | 'yellow' | 'orange' | 'green' | 'gray-100' | 'gray-200' | 'gray-300' | 'gray-400' | 'gray-500' | 'gray-600' | 'gray-700' | 'gray-800' | 'gray-900' = 'gray-700';
  @Input() w: 'unset' | '25' | '50' | '75' | '100' | 'auto' | '1px' | '2px' | '3px' | '4px' | '5px' | '6px' | '7px' | '8px' | '9px' | '10px' | '15px' | '20px' | '25px' | '30px' | '35px' | '40px' | '45px' | '50px' | '55px' | '60px' | '65px' | '70px' | '75px' | '100px' | '125px' | '150px' | '160px' | '175px' | '200px' | '225px' | '250px' | '275px' | '300px' | '325px' | '350px' | '375px' | '400px' | '425px' | '450px' | '475px' | '500px' = 'auto';
  @Input() wmd: 'unset' | '25' | '50' | '75' | '100' | 'auto' | '1px' | '2px' | '3px' | '4px' | '5px' | '6px' | '7px' | '8px' | '9px' | '10px' | '15px' | '20px' | '25px' | '30px' | '35px' | '40px' | '45px' | '50px' | '55px' | '60px' | '65px' | '70px' | '75px' | '100px' | '125px' | '150px' | '160px' | '175px' | '200px' | '225px' | '250px' | '275px' | '300px' | '325px' | '350px' | '375px' | '400px' | '425px' | '450px' | '475px' | '500px' = 'auto';
  @Input() h: 'unset' | '25' | '50' | '75' | '100' | 'auto' | '1px' | '2px' | '3px' | '4px' | '5px' | '6px' | '7px' | '8px' | '9px' | '10px' | '15px' | '20px' | '25px' | '30px' | '35px' | '40px' | '45px' | '50px' | '55px' | '60px' | '65px' | '70px' | '75px' | '100px' | '125px' | '150px' | '160px' | '175px' | '200px' | '225px' | '250px' | '275px' | '300px' | '325px' | '350px' | '375px' | '400px' | '425px' | '450px' | '475px' | '500px' = 'auto';
  @Input() hmd: 'unset' | '25' | '50' | '75' | '100' | 'auto' | '1px' | '2px' | '3px' | '4px' | '5px' | '6px' | '7px' | '8px' | '9px' | '10px' | '15px' | '20px' | '25px' | '30px' | '35px' | '40px' | '45px' | '50px' | '55px' | '60px' | '65px' | '70px' | '75px' | '100px' | '125px' | '150px' | '160px' | '175px' | '200px' | '225px' | '250px' | '275px' | '300px' | '325px' | '350px' | '375px' | '400px' | '425px' | '450px' | '475px' | '500px' = 'auto';
  @Input() size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '2x' | '3x' | '4x' | '5x' = '2x';

  elem: HTMLElement;
  toggleClass = 'maximize';

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === ESCAPE_KEY) {
      this.toggleClass = 'maximize'
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  toggleFullscreen() {
    this.toggleClass === 'maximize' ? this.openFullscreen() : this.closeFullscreen()
  }

  get screenMode(): string {
    return this.toggleClass === 'maximize' ? 'arrow-up-right-and-arrow-down-left-from-center' : 'arrow-down-left-and-arrow-up-right-to-center';
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.toggleClass = 'minimize';
    } else if (this.document.mozRequestFullScreen) {
      /* Firefox */
      this.document.mozRequestFullScreen();
      this.toggleClass = 'minimize';
    } else if (this.document.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitRequestFullscreen();
      this.toggleClass = 'minimize';
    } else if (this.document.msRequestFullscreen) {
      /* IE/Edge */
      this.document.msRequestFullscreen();
      this.toggleClass = 'minimize';
    }
  }

  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
      this.toggleClass = 'maximize';
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
      this.toggleClass = 'maximize';
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
      this.toggleClass = 'maximize';
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
      this.toggleClass = 'maximize';
    }
  }
}
