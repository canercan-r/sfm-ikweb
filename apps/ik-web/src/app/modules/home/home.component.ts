import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@lib-common';
import { IApexArea, IApexBar, IApexColumn, IApexMixed, IApexPie } from '../../shared/components/apexcharts/interfaces';
import { ChartDataService } from '../../shared/services/apis/chart-data.service';

@Component({
  selector: 'ikweb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  area6Series: IApexArea[];
  area6Categories = ['Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  area6Height = 200;
  area6BaseColor = '#0066ff';
  area6BaseStrokeColor = '#0962e8';
  area6BaseLightColor = '#d2e3fc';
  area6SecondaryColor = '#f1416c';
  area6SecondaryLightColor = '#fff5f8';
  area6SecondaryStrokeColor = '#d9214e';
  area5Series: IApexArea[];
  area5Categories = ['Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  area5Currency = '₺';
  area5Height = 200;
  area5BaseColor = '#50cd89';
  area5BaseStrokeColor = '#47be7d';
  area5BaseLightColor = '#e8fff3';
  area5SecondaryColor = '#7239ea';
  area5SecondaryLightColor = '#f8f5ff';
  area5SecondaryStrokeColor = '#5014d0';
  area7Series: IApexArea[];
  area7Categories = ['Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  area7Height = 200;
  area7BaseColor = '#bf51e0';
  area7BaseStrokeColor = '#61087c';
  area7BaseLightColor = '#eac0f6';
  area7SecondaryColor = '#ffc107';
  area7SecondaryLightColor = '#fff8dd';
  area7SecondaryStrokeColor = '#f1bc00';
  area7TertiaryColor = '#50cd89';
  area7TertiaryLightColor = '#e8fff3';
  area7TertiaryStrokeColor = '#47be7d';
  column1Series: IApexColumn[];
  column1Categories = ['Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  column1Currency = '₺';
  column1Height = 300;
  column1BaseColor = '#7239ea';
  column1SecondaryColor = '#ffc107';
  column1SuccessColor = '#50cd89';
  column4Series: IApexColumn[];
  column4Categories = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'];
  column4Height = 300;
  column4PrimaryColor = '#3085fe';
  column4PurpleColor = '#bf51e0';
  column4SuccessColor = '#50cd89';
  column7Series: IApexColumn[];
  column7Categories: string[] = [];
  column7Height = 300;
  column7BaseColor = '#7239ea';
  column7WarningColor = '#ffc107';
  column7DangerColor = '#f1416c';
  bar1Series: IApexBar[];
  bar1Categories = ['Güney Kore', 'Kanada', 'İngiltere', 'Hollanda', 'İtalya', 'Fransa', 'Japonya', 'ABD', 'Çin', 'Almanya'];
  bar1Height = 300;
  bar1BaseColor = '#0dcaf0';
  bar2Series: IApexBar[];
  bar2Categories = ['Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  bar2Currency = '₺';
  bar2Height = 300;
  bar2BaseColor = '#7239ea';
  bar2SecondaryColor = '#ffc107';
  bar2TertiaryColor = '#50cd89';
  bar6Series: IApexBar[];
  bar6Categories: string[] = [];
  bar6Height = 300;
  bar6BaseColor = '#7239ea';
  bar6WarningColor = '#ffc107';
  bar6DangerColor = '#f1416c';
  mixed1Series: IApexMixed[];
  mixed1Categories = ['Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem'];
  mixed1Currency = '$';
  mixed1Height = 300;
  mixed1BaseColor = '#3085fe';
  mixed1BaseLightColor = '#dde8fa';
  mixed1SecondaryColor = '#7239ea';
  mixed2Series: IApexMixed[];
  mixed2Categories = ['Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl'];
  mixed2Height = 300;
  mixed2BaseColor = '#fcd974';
  mixed2SecondaryColor = '#4880c8';
  mixed3Series: IApexMixed[];
  mixed3Categories = ['Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  mixed3Height = 300;
  mixed3BaseColor = '#0dcaf0';
  mixed3BaseLightColor = '#cff4fc';
  mixed3SecondaryColor = '#f68df9';
  mixed4Series: IApexMixed[];
  mixed4Categories = ['Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  mixed4Height = 300;
  mixed4BaseColor = '#7239ea';
  mixed4SecondaryColor = '#50cd89';
  mixed4SecondaryLightColor = '#e8fff3';
  mixed4WarningColor = '#ffc107';
  mixed5Series: IApexMixed[];
  mixed5Categories = ['Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl'];
  mixed5Height = 300;
  mixed5BaseColor = '#4880c8';
  mixed5SecondaryColor = '#1dc894';
  mixed5WarningColor = '#ffc107';
  pie1Series: IApexPie[];
  pie1Labels = ['Takım A', 'Takım B', 'Takım C', 'Takım D', 'Takım E'];
  pie1Height = 250;
  pie2Series: IApexPie[];
  pie2Labels = ['Takım A', 'Takım B', 'Takım C', 'Takım D', 'Takım E'];
  pie2Height = 250;
  pie5Series: IApexPie[];
  pie5Labels = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
  pie5Height = 250;

  constructor(
    private _languageService: LanguageService,
    private _chartDataService: ChartDataService,
  ) {}

  ngOnInit(): void {
    this._chartDataService.getApexArea5$().subscribe(d => this.area5Series = d);
    this._chartDataService.getApexArea6$().subscribe(d => this.area6Series = d);
    this._chartDataService.getApexArea7$().subscribe(d => this.area7Series = d);
    this._chartDataService.getApexColumn1$().subscribe(d => this.column1Series = d);
    this._chartDataService.getApexColumn4$().subscribe(d => this.column4Series = d);
    this._chartDataService.getApexColumn7$().subscribe(d => this.column7Series = d);
    this._chartDataService.getApexBar1$().subscribe(d => this.bar1Series = d);
    this._chartDataService.getApexBar2$().subscribe(d => this.bar2Series = d);
    this._chartDataService.getApexBar6$().subscribe(d => this.bar6Series = d);
    this._chartDataService.getApexMixed1$().subscribe(d => this.mixed1Series = d);
    this._chartDataService.getApexMixed2$().subscribe(d => this.mixed2Series = d);
    this._chartDataService.getApexMixed3$().subscribe(d => this.mixed3Series = d);
    this._chartDataService.getApexMixed4$().subscribe(d => this.mixed4Series = d);
    this._chartDataService.getApexMixed5$().subscribe(d => this.mixed5Series = d);
    this._chartDataService.getApexPie1$().subscribe(d => this.pie1Series = d);
    this._chartDataService.getApexPie2$().subscribe(d => this.pie2Series = d);
    this._chartDataService.getApexPie5$().subscribe(d => this.pie5Series = d);
  }

  setLanguage(language: string) {
    this._languageService.language = language;
  }

  get currentLanguage(): string {
    return this._languageService.language;
  }

  get languages(): string[] {
    return this._languageService.supportedLanguages;
  }
}
