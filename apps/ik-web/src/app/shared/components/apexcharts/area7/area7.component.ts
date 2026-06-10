import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IApexArea } from '../interfaces';

@Component({
  selector: 'ikweb-apex-area7',
  templateUrl: './area7.component.html',
  styleUrls: ['./area7.component.scss'],
})
export class ApexArea7Component implements OnInit {
  @ViewChild('apexArea7') chart: ApexArea7Component;
  @Input() series: IApexArea[];
  @Input() categories: string[] = [];
  @Input() height: number;
  @Input() color: string;
  @Input() baseColor: string;
  @Input() baseStrokeColor: string;
  @Input() baseLightColor: string;
  @Input() secondaryColor: string;
  @Input() secondaryStrokeColor: string;
  @Input() secondaryLightColor: string;
  @Input() tertiaryColor: string;
  @Input() tertiaryStrokeColor: string;
  @Input() tertiaryLightColor: string;

  public chartOptions: any = {};

  public gray500 = '#a1a5b7';
  public gray200 = '#f4f4f4';
  public gray300 = '#e1e3ea';

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
        stacked: true,
        toolbar: { show: false },
      },
      plotOptions: {},
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        labels: { colors: this.gray500 },
        markers: { fillColors: [this.baseColor, this.secondaryColor, this.tertiaryColor] },
      },
      dataLabels: { enabled: false },
      fill: {
        type: 'gradient',
        gradient: { opacityFrom: 0.6, opacityTo: 0.8 },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.baseStrokeColor, this.secondaryStrokeColor, this.tertiaryStrokeColor],
      },
      xaxis: {
        categories: this.categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
        crosshairs: { show: false, position: 'front', stroke: { color: this.baseColor, width: 1, dashArray: 3 } },
        tooltip: { enabled: false, formatter: undefined, offsetY: 0, style: { fontSize: '12px' } },
      },
      yaxis: { labels: { show: false } },
      states: {
        normal: { filter: { type: 'none', value: 0 } },
        hover: { filter: { type: 'none', value: 0 } },
        active: { allowMultipleDataPointsSelection: false, filter: { type: 'none', value: 0 } },
      },
      tooltip: {
        style: { fontSize: '12px' },
        marker: { show: true },
      },
      colors: [this.baseLightColor, this.secondaryLightColor, this.tertiaryLightColor],
      grid: {
        borderColor: this.gray200,
        strokeDashArray: 4,
        yaxis: { lines: { show: false } },
        xaxis: { lines: { show: false } },
      },
      markers: {
        colors: [this.baseStrokeColor, this.secondaryStrokeColor, this.tertiaryStrokeColor],
        strokeColor: [this.baseStrokeColor, this.secondaryStrokeColor, this.tertiaryStrokeColor],
        strokeWidth: 3,
      },
    };
  }
}
