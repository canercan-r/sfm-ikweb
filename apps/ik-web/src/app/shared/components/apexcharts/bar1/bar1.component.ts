import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexBar } from '../interfaces';

@Component({
  selector: 'ikweb-apex-bar1',
  templateUrl: './bar1.component.html',
  styleUrls: ['./bar1.component.scss'],
})
export class ApexBar1Component implements OnInit {
  @ViewChild('apexBar1') chart: ApexBar1Component;
  @Input() series: IApexBar[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;

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
      colors: [this.baseColor],
      plotOptions: {
        bar: { horizontal: true, borderRadius: 8 },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
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
        marker: { show: false },
        y: { formatter: (val: any) => val },
      },
    };
  }
}
