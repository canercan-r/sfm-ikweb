import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { environment } from '@ikweb-env/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandingHelperService {
  private renderer: Renderer2;
  private tenantName: string;

  constructor(
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.tenantName = environment.brandName;
  }

  applyBranding(): void {
    const tenantStyleRoot = `assets/branding/${this.tenantName}`;

    this.addCss(`${tenantStyleRoot}/_root.css`);
    this.addFavicon(`${tenantStyleRoot}/favicon.ico`);
  }

  private addCss(href: string): void {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'type', 'text/css');
    this.renderer.setAttribute(link, 'href', href);
    this.renderer.appendChild(document.head, link);
  }

  private addFavicon(href: string): void {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'icon');
    this.renderer.setAttribute(link, 'type', 'image/x-icon');
    this.renderer.setAttribute(link, 'href', href);
    this.renderer.appendChild(document.head, link);
  }
}
