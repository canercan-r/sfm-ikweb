import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@ikweb-layout/core/layout.service';

@Component({
  selector: 'ikweb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerContainerCssClasses: string = '';
  currentDateStr: string = new Date().getFullYear().toString();
  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    this.footerContainerCssClasses = this.layout.getStringCSSClasses('footerContainer');
  }
}
