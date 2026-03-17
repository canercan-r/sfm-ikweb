import { Route, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

/**
 * Provides helper methods to create routes.
 */
export class Layout {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: LayoutComponent,
      children: routes,
      // canActivate: [AuthGuard],
      canActivateChild: [],
      data: { reuse: true },
      runGuardsAndResolvers: 'always',
    };
  }
}
