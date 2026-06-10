import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexColumn } from '../interfaces';

@Component({
  selector: 'ikweb-apex-column1',
  templateUrl: './column1.component.html',
  styleUrls: ['./column1.component.scss'],
})
export class ApexColumn1Component implements OnInit {
  @ViewChild('apexColumn1') chart: ApexColumn1Component;
  @Input() series: IApexColumn[] = [];
  @Input() categories: string[] = [];
  @Input() currency: string;
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() secondaryColor: string;
  @Input() successColor: string;

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
        type: 'bar',
        height: this.height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: ['50%'],
          endingShape: 'rounded',
          borderRadius: 3,
        },
      },
      legend: {
        show: true,
        labels: { colors: this.gray500 },
      },
      dataLabels: { enabled: false },
      colors: [this.baseColor, this.secondaryColor, this.successColor],
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      yaxis: {
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
      grid: {
        borderColor: this.gray200,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    };
  }
}
