import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexBar } from '../interfaces';

@Component({
  selector: 'ikweb-apex-bar6',
  templateUrl: './bar6.component.html',
  styleUrls: ['./bar6.component.scss'],
})
export class ApexBar6Component implements OnInit {
  @ViewChild('apexBar6') chart: ApexBar6Component;
  @Input() series: IApexBar[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() warningColor: string;
  @Input() dangerColor: string;

  public chartOptions: any = {};

  public gray500 = '#a1a5b7';
  public gray300 = '#e1e3ea';
  public gray200 = '#f4f4f4';

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    return {
      series: this.series,
      chart: {
        type: 'bar',
        height: this.height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          colors: {
            ranges: [
              { from: -100, to: -46, color: this.dangerColor },
              { from: -45, to: 0, color: this.warningColor },
            ],
          },
          borderRadius: 3,
          barHeight: '100%',
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      grid: {
        yaxis: { lines: { show: false } },
        xaxis: { lines: { show: false } },
      },
      xaxis: {
        labels: { show: true, style: { colors: this.gray500 } },
        axisBorder: { show: true },
        axisTicks: { show: false },
        categories: this.categories,
      },
      yaxis: { labels: { show: false } },
    };
  }
}
