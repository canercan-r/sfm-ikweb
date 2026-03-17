import { Location } from "@angular/common";
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PageStackService {
  private rootPage = 'home';
  private _BackwardForm = 'home';
  private _inRequestProcess = false;

  public pageStack: { path: string; ekstras: NavigationExtras }[] = [{ path: 'home', ekstras: null }];
  public currentPage: { path: string; ekstras: NavigationExtras };

  constructor(private _router: Router, private _location: Location) { }

  public get InRequestProcess(): boolean {
    return this._inRequestProcess;
  }
  public set InRequestProcess(v: boolean) {
    this._inRequestProcess = v;
  }

  public get BackwardForm(): string {
    return this._BackwardForm;
  }
  public set BackwardForm(v: string) {
    this._BackwardForm = v;
  }

  goBack() {
    if (this.pageStack.length > 1) {
      this._location.back();
      const forwardUrl = this.pageStack.pop();
      this.currentPage = forwardUrl;
      if (forwardUrl?.ekstras) {
        this._router.navigate([forwardUrl?.path], forwardUrl.ekstras);
      } else {
        this._router.navigate([forwardUrl?.path]);
      }
    } else {
      this.goHome();
      // this._nav.back();
    }
  }

  navigateRoot(path: string) {
    this._location.back();
    this.rootPage = path;
    this.pageStack = [{ path: path, ekstras: null }];
    this.BackwardForm = path;
    this._router.navigate([path]);
    this.currentPage = null;
    this._inRequestProcess = false;
  }

  goHome() {
    this.navigateRoot('home');
  }

  isActive(path: string): boolean {
    return this.currentPage?.path === path || this._router.url === path;
  }

  navigateForward(path: string, extras: NavigationExtras = null, inRequestProces = false) {
    this._inRequestProcess = inRequestProces;

    const currentUrl = this.currentPage?.path ?? this._router.url;

    const control = this.pageStack.length > 0 ? this.pageStack[this.pageStack.length - 1] : null;
    if (control?.path !== currentUrl) {
      this.pageStack.push({ path: currentUrl, ekstras: this.currentPage?.ekstras });
    }

    this.currentPage = { path, ekstras: extras };

    this._location.forward()
    if (extras) {
      this._router.navigate([path], extras);
    } else this._router.navigate([path]);
  }

  navigateBack(path: string) {
    const ind = this.pageStack.map((x) => x.path).lastIndexOf(path);
    this._location.back();
    if (ind > -1) {
      this.pageStack.splice(ind);
      this.currentPage = this.pageStack.length > 0 ? this.pageStack[this.pageStack.length - 1] : null;
      this._router.navigate([path]);
    } else {
      this.goHome();
    }
    this.currentPage = null;
  }

  navigateTab(path: string) {
    this._inRequestProcess = false;
    this.pageStack = [{ path: this.rootPage, ekstras: null }];
    this.currentPage = { path: path, ekstras: null };
    this._router.navigate([path]);
  }
}
