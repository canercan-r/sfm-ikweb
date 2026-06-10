import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexArea } from '../interfaces';

@Component({
  selector: 'ikweb-apex-area2',
  templateUrl: './area2.component.html',
  styleUrls: ['./area2.component.scss'],
})
export class ApexArea2Component implements OnInit {
  @ViewChild('apexArea2') chart: ApexArea2Component;
  @Input() series: IApexArea[];
  @Input() categories: string[] = [];
  @Input() currency: string;
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() strokeColor: string;
  @Input() lightColor: string;

  public chartOptions: any = {};

  public gray500 = '#a1a5b7';
  public gray200 = '#f4f4f4';
  public gray300 = '#e1e3ea';

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    return {
      series: this.series,
      chart: {
        fontFamily: 'inherit',
        type: 'area',
        height: this.height,
        toolbar: { show: false },
        zoom: { enabled: false },
        sparkline: { enabled: true },
      },
      plotOptions: {},
      legend: { show: false },
      dataLabels: { enabled: false },
      fill: { type: 'solid', opacity: 1 },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.strokeColor],
      },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false, style: { colors: this.gray500, fontSize: '12px' } },
        crosshairs: { show: false, position: 'front', stroke: { color: this.gray300, width: 1, dashArray: 3 } },
      },
      yaxis: {
        min: 0,
        max: 80,
        labels: { show: false, style: { colors: this.gray500, fontSize: '12px' } },
      },
      states: {
        normal: { filter: { type: 'none', value: 0 } },
        hover: { filter: { type: 'none', value: 0 } },
        active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } },
      },
      tooltip: {
        style: { fontSize: '12px' },
        y: { formatter: (val: string) => `${this.currency}${val}` },
        marker: { show: false },
      },
      colors: [this.lightColor],
      markers: {
        colors: [this.strokeColor],
        strokeColor: [this.strokeColor],
        strokeWidth: 3,
      },
    };
  }
}
