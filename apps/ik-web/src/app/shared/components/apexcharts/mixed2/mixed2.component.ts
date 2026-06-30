import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexMixed } from '../interfaces';

@Component({
  selector: 'ikweb-apex-mixed2',
  templateUrl: './mixed2.component.html',
  styleUrls: ['./mixed2.component.scss'],
})
export class ApexMixed2Component implements OnInit {
  @ViewChild('apexMixed2') chart: ApexMixed2Component;
  @Input() series: IApexMixed[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
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
      },
      stroke: { width: [0, 4] },
      plotOptions: {
        bar: { columnWidth: ['30%'], borderRadius: 4 },
      },
      legend: {
        show: true,
        labels: { colors: this.gray500 },
      },
      dataLabels: { enabled: true, enabledOnSeries: [1] },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
        labels: { show: false },
      },
      yaxis: [
        {
          labels: { show: true, style: { colors: this.gray500, fontSize: '12px' } },
          opposite: false,
        },
        {
          labels: { show: true, style: { colors: this.gray500, fontSize: '12px' } },
          opposite: true,
        },
      ],
      colors: [this.baseColor, this.secondaryColor],
    };
  }
}
