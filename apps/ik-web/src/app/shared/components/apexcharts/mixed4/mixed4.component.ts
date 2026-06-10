import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexMixed } from '../interfaces';

@Component({
  selector: 'ikweb-apex-mixed4',
  templateUrl: './mixed4.component.html',
  styleUrls: ['./mixed4.component.scss'],
})
export class ApexMixed4Component implements OnInit {
  @ViewChild('apexMixed4') chart: ApexMixed4Component;
  @Input() series: IApexMixed[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() secondaryLightColor: string;
  @Input() secondaryColor: string;
  @Input() warningColor: string;

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
        height: this.height,
        type: 'line',
        stacked: false,
        toolbar: { show: false },
      },
      stroke: {
        width: [0, 2, 4],
        curve: 'smooth',
        colors: [this.warningColor, this.secondaryColor],
      },
      plotOptions: {
        bar: { columnWidth: '25%', borderRadius: 4 },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      legend: {
        show: true,
        labels: { colors: this.gray500 },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: { show: false },
      },
      yaxis: [{ labels: { show: false }, min: 0 }],
      colors: [this.baseColor, this.secondaryLightColor, this.warningColor],
      tooltip: {
        shared: true,
        intersect: false,
        marker: { show: true },
        y: {
          formatter: (y: any) => {
            if (typeof y !== 'undefined') return y.toFixed(0);
            return y;
          },
        },
      },
      markers: {
        colors: [this.secondaryColor, this.baseColor, this.warningColor],
        strokeColor: [this.secondaryColor, this.baseColor, this.warningColor],
      },
    };
  }
}
