import { Injectable } from '@angular/core';
import { IApexArea, IApexBar, IApexColumn, IApexMixed, IApexPie } from '../../components/apexcharts/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChartDataService {

  getApexArea5$(): Observable<IApexArea[]> {
    return of([
      { name: '', data: [31, 40, 28, 51, 42, 79, 70] },
      { name: '', data: [11, 32, 45, 32, 34, 52, 41] },
    ]);
  }

  getApexArea6$(): Observable<IApexArea[]> {
    return of([
      { name: '', data: [322, 324, 329, 342, 348, 334, 316] },
      { name: '', data: [162, 50, -45, -120, -88, -169, -184] },
    ]);
  }

  getApexArea7$(): Observable<IApexArea[]> {
    return of([
      { name: '', data: [10, 36, 47, 20, 59, 23, 15] },
      { name: '', data: [15, 19, 18, 11, 19, 14, 12] },
      { name: '', data: [12, 11, 12, 10, 13, 11, 11] },
    ]);
  }

  getApexColumn1$(): Observable<IApexColumn[]> {
    return of([
      { name: '', data: [44, 55, 57, 56, 58, 60, 66] },
      { name: '', data: [76, 85, 10, 98, 87, 91, 94] },
      { name: '', data: [35, 41, 36, 26, 45, 48, 41] },
    ]);
  }

  getApexColumn4$(): Observable<IApexColumn[]> {
    return of([
      { name: '', data: [44, 55, 41, 67, 22, 43] },
      { name: '', data: [13, 23, 20, 8, 13, 27] },
      { name: '', data: [11, 17, 15, 15, 21, 14] },
    ]);
  }

  getApexColumn7$(): Observable<IApexColumn[]> {
    return of([
      { name: '', data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4] },
    ]);
  }

  getApexBar1$(): Observable<IApexBar[]> {
    return of([
      { name: '', data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] },
    ]);
  }

  getApexBar2$(): Observable<IApexBar[]> {
    return of([
      { name: '', data: [44, 55, 57, 56, 58, 60, 66] },
      { name: '', data: [76, 85, 10, 98, 87, 91, 94] },
      { name: '', data: [35, 41, 36, 26, 45, 48, 41] },
    ]);
  }

  getApexBar6$(): Observable<IApexBar[]> {
    return of([
      { name: '', data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4] },
    ]);
  }

  getApexMixed1$(): Observable<IApexMixed[]> {
    return of([
      { name: '', type: 'bar', stacked: true, data: [40, 50, 65, 70, 50, 30] },
      { name: '', type: 'bar', stacked: true, data: [20, 20, 25, 30, 30, 20] },
      { name: '', type: 'area', data: [50, 80, 60, 90, 50, 70] },
    ]);
  }

  getApexMixed2$(): Observable<IApexMixed[]> {
    return of([
      { name: '', type: 'column', data: [440, 505, 414, 671, 227, 201, 352, 752] },
      { name: '', type: 'line', data: [23, 42, 35, 27, 43, 22, 31, 16] },
    ]);
  }

  getApexMixed3$(): Observable<IApexMixed[]> {
    return of([
      { name: '', type: 'area', data: [44, 55, 31, 47, 31, 43, 26, 61, 41, 47, 33] },
      { name: '', type: 'line', data: [55, 70, 40, 58, 43, 55, 35, 52, 34, 39, 48] },
    ]);
  }

  getApexMixed4$(): Observable<IApexMixed[]> {
    return of([
      { name: '', type: 'column', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
      { name: '', type: 'area', data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43] },
      { name: '', type: 'line', data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39] },
    ]);
  }

  getApexMixed5$(): Observable<IApexMixed[]> {
    return of([
      { name: '', type: 'column', data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6] },
      { name: '', type: 'column', data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5] },
      { name: '', type: 'line', data: [20, 29, 37, 36, 44, 45, 50, 58] },
    ]);
  }

  getApexPie1$(): Observable<IApexPie[]> {
    return of([{ name: '', data: [44, 55, 13, 43, 22] }]);
  }

  getApexPie2$(): Observable<IApexPie[]> {
    return of([{ name: '', data: [44, 55, 13, 43, 22] }]);
  }

  getApexPie5$(): Observable<IApexPie[]> {
    return of([{ name: '', data: [44, 55, 41, 17, 15] }]);
  }
}
