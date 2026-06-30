import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexColumn } from '../interfaces';

@Component({
  selector: 'ikweb-apex-column7',
  templateUrl: './column7.component.html',
  styleUrls: ['./column7.component.scss'],
})
export class ApexColumn7Component implements OnInit {
  @ViewChild('apexColumn7') chart: ApexColumn7Component;
  @Input() series: IApexColumn[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() warningColor: string;
  @Input() dangerColor: string;

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
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              { from: -100, to: -46, color: this.dangerColor },
              { from: -45, to: 0, color: this.warningColor },
            ],
          },
          borderRadius: 4,
          columnWidth: '80%',
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        labels: { show: false, style: { colors: this.gray500 } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: this.categories,
      },
      yaxis: {
        labels: { style: { colors: this.gray500 } },
      },
    };
  }
}
