import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexMixed } from '../interfaces';

@Component({
  selector: 'ikweb-apex-mixed5',
  templateUrl: './mixed5.component.html',
  styleUrls: ['./mixed5.component.scss'],
})
export class ApexMixed5Component implements OnInit {
  @ViewChild('apexMixed5') chart: ApexMixed5Component;
  @Input() series: IApexMixed[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() secondaryColor: string;
  @Input() warningColor: string;

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
        stacked: false,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: { width: [2, 2, 4] },
      plotOptions: {
        bar: { columnWidth: '40%', borderRadius: 4 },
      },
      legend: { show: false },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: { show: false },
      },
      yaxis: [
        { axisBorder: { show: false }, axisTicks: { show: false }, tooltip: { enabled: false }, labels: { show: false } },
        { opposite: true, axisBorder: { show: false }, axisTicks: { show: false }, tooltip: { enabled: false }, labels: { show: false } },
        { axisBorder: { show: false }, axisTicks: { show: false }, tooltip: { enabled: false }, labels: { show: false } },
      ],
      colors: [this.baseColor, this.secondaryColor, this.warningColor],
      tooltip: {
        fixed: { enabled: true, position: 'topLeft', offsetY: 30, offsetX: 60 },
      },
    };
  }
}
