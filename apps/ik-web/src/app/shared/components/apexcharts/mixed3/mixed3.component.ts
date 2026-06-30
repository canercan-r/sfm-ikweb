import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexMixed } from '../interfaces';

@Component({
  selector: 'ikweb-apex-mixed3',
  templateUrl: './mixed3.component.html',
  styleUrls: ['./mixed3.component.scss'],
})
export class ApexMixed3Component implements OnInit {
  @ViewChild('apexMixed3') chart: ApexMixed3Component;
  @Input() series: IApexMixed[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() baseLightColor: string;
  @Input() secondaryColor: string;

  public chartOptions: any = {};

  public gray500 = 'var(--gray-500)';
  public gray300 = 'var(--gray-300)';
  public gray200 = 'var(--gray-200)';

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    return {
      series: this.series,
      chart: {
        height: this.height,
        type: 'line',
        toolbar: { show: false },
        sparkline: { enabled: true },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.baseColor, this.secondaryColor],
      },
      fill: { type: 'solid', opacity: [0.35, 1] },
      legend: { show: false },
      dataLabels: { enabled: false },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: { show: false, trim: false },
      },
      yaxis: [
        { labels: { show: false } },
        { labels: { show: false }, opposite: true },
      ],
      colors: [this.baseLightColor, this.secondaryColor],
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
        colors: [this.baseColor, this.secondaryColor],
        strokeColor: [this.baseColor, this.secondaryColor],
        size: 0,
      },
    };
  }
}
