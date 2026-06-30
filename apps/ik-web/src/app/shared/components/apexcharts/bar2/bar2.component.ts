import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexBar } from '../interfaces';

@Component({
  selector: 'ikweb-apex-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.scss'],
})
export class ApexBar2Component implements OnInit {
  @ViewChild('apexBar2') chart: ApexBar2Component;
  @Input() series: IApexBar[] = [];
  @Input() categories: string[] = [];
  @Input() currency: string;
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() secondaryColor: string;
  @Input() tertiaryColor: string;

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
        fontFamily: 'inherit',
        type: 'bar',
        height: this.height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { horizontal: true, borderRadius: 3 },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      colors: [this.baseColor, this.secondaryColor, this.tertiaryColor],
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      yaxis: {
        labels: { show: true, style: { colors: this.gray500, fontSize: '12px' } },
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
    };
  }
}
