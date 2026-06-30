import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexColumn } from '../interfaces';

@Component({
  selector: 'ikweb-apex-column4',
  templateUrl: './column4.component.html',
  styleUrls: ['./column4.component.scss'],
})
export class ApexColumn4Component implements OnInit {
  @ViewChild('apexColumn4') chart: ApexColumn4Component;
  @Input() series: IApexColumn[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() primaryColor: string;
  @Input() purpleColor: string;
  @Input() successColor: string;

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
        type: 'bar',
        height: this.height,
        stacked: true,
        stackType: '100%',
        toolbar: { show: false },
      },
      colors: [this.primaryColor, this.successColor, this.purpleColor],
      legend: {
        position: 'right',
        offsetY: 50,
        offsetX: -10,
        labels: { colors: this.gray500 },
      },
      dataLabels: { enabled: true, style: { fontSize: '12px' } },
      xaxis: {
        categories: this.categories,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: this.gray500, fontSize: '12px' } },
      },
    };
  }
}
