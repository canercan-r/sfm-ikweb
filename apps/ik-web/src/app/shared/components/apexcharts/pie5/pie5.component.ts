import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexPie } from '../interfaces';

@Component({
  selector: 'ikweb-apex-pie5',
  templateUrl: './pie5.component.html',
  styleUrls: ['./pie5.component.scss'],
})
export class ApexPie5Component implements OnInit {
  @ViewChild('apexPie5') chart: ApexPie5Component;
  @Input() series: IApexPie[];
  @Input() labels: string[] = [];
  @Input() height: number;

  public chartOptions: any = {};

  public gray500 = 'var(--gray-500)';
  public gray300 = 'var(--gray-300)';
  public gray200 = 'var(--gray-200)';

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions();
  }

  getChartOptions() {
    return {
      series: this.series[0].data,
      chart: {
        height: this.height,
        width: '100%',
        type: 'donut',
        toolbar: { show: false },
      },
      labels: this.labels,
      legend: { labels: { colors: this.gray500 } },
      plotOptions: {
        pie: { startAngle: -90, endAngle: 90, offsetY: 10 },
      },
      grid: { padding: { bottom: -80 } },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: 'bottom' },
          },
        },
      ],
    };
  }
}
