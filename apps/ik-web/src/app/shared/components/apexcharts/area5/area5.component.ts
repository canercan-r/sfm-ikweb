import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexArea } from '../interfaces';

@Component({
  selector: 'ikweb-apex-area5',
  templateUrl: './area5.component.html',
  styleUrls: ['./area5.component.scss'],
})
export class ApexArea5Component implements OnInit {
  @ViewChild('apexArea5') chart: ApexArea5Component;
  @Input() series: IApexArea[];
  @Input() categories: string[] = [];
  @Input() currency: string;
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() baseStrokeColor: string;
  @Input() baseLightColor: string;
  @Input() secondaryColor: string;
  @Input() secondaryStrokeColor: string;
  @Input() secondaryLightColor: string;

  public chartOptions: any = {};

  public gray500 = 'var(--gray-500)';
  public gray200 = 'var(--gray-200)';
  public gray300 = 'var(--gray-300)';

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
      },
      plotOptions: {},
      legend: {
        show: true,
        labels: { colors: this.gray500 },
        markers: { fillColors: [this.baseColor, this.secondaryColor] },
      },
      dataLabels: { enabled: false },
      fill: { type: 'solid', opacity: 1 },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.baseStrokeColor, this.secondaryStrokeColor],
      },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false, style: { colors: this.gray500, fontSize: '12px' } },
        crosshairs: { show: false, position: 'front', stroke: { color: this.baseColor, width: 1, dashArray: 3 } },
        tooltip: { enabled: false, formatter: undefined, offsetY: 0, style: { fontSize: '12px' } },
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
        y: { formatter: (val: string) => `${this.currency}${val}` },
        marker: { show: false },
      },
      colors: [this.baseLightColor, this.secondaryLightColor],
      grid: {
        borderColor: this.gray200,
        yaxis: { lines: { show: false } },
        xaxis: { lines: { show: false } },
      },
      markers: {
        colors: [this.baseStrokeColor, this.secondaryStrokeColor],
        strokeColor: [this.baseStrokeColor, this.secondaryStrokeColor],
        strokeWidth: 3,
      },
    };
  }
}
