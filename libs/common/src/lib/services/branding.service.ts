import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ConfigurationService } from '@lib-core';

@Injectable({
  providedIn: 'root'
})
export class BrandingService {
  private renderer: Renderer2;
  private brandName: string;

  constructor(
    rendererFactory: RendererFactory2,
    private _conf: ConfigurationService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.brandName = this._conf.getAppSettings().BrandName;
  }

  applyBranding(): void {
    const brandStyleRoot = `assets/branding/${this.brandName}`;

    this.addCss(`${brandStyleRoot}/_root.css`);
    this.addFavicon(`${brandStyleRoot}/favicon.ico`);
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
