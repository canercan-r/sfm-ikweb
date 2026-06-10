import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexMixed } from '../interfaces';

@Component({
  selector: 'ikweb-apex-mixed1',
  templateUrl: './mixed1.component.html',
  styleUrls: ['./mixed1.component.scss'],
})
export class ApexMixed1Component implements OnInit {
  @ViewChild('apexMixed1') chart: ApexMixed1Component;
  @Input() series: IApexMixed[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() currency: string;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() baseLightColor: string;
  @Input() secondaryColor: string;

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
        fontFamily: 'inherit',
        stacked: true,
        height: this.height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { stacked: true, horizontal: false, columnWidth: ['25%'], borderRadius: 4 },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: { show: false, style: { colors: this.gray500, fontSize: '12px' } },
      },
      yaxis: {
        max: 120,
        labels: { style: { colors: this.gray500, fontSize: '12px' } },
      },
      states: {
        normal: { filter: { type: 'none', value: 0 } },
        hover: { filter: { type: 'none', value: 0 } },
        active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } },
      },
      tooltip: {
        style: { fontSize: '12px' },
        y: { formatter: (val: string) => `${this.currency}${val}.000` },
      },
      colors: [this.baseColor, this.secondaryColor, this.baseLightColor],
      grid: {
        borderColor: this.gray200,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    };
  }
}
