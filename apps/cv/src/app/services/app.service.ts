import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { OnAppInit } from "@cv-models/shared";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnAppInit {

  route$: Subject<ActivatedRouteSnapshot> = new Subject<ActivatedRouteSnapshot>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnAppInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.route.snapshot;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.route$.next(route);
    });
  }
}
