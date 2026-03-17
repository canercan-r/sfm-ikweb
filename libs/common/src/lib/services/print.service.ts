import { Injectable } from '@angular/core';
import { IReportPrint } from '@lib-common';
import { RxStompRPCService, RxStompService } from '@stomp/ng2-stompjs';
import { publishParams } from '@stomp/stompjs';
import { interval, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private rxStompRPCService: RxStompRPCService;

  constructor(private rxStompService: RxStompService) {
    this.rxStompRPCService = new RxStompRPCService(this.rxStompService);
  }

  public print(reportParams: IReportPrint | IReportPrint[]): void {
    let reports: IReportPrint[] = [];

    if (reportParams instanceof Array) {
      reportParams.forEach((x) => {
        x.copy = this.getCopy(x.copy);
      });
      reports = reportParams;
    } else {
      reportParams.copy = this.getCopy(reportParams.copy);
      reports.push(reportParams);
    }

    interval(1000)
      .pipe(
        take(reports.length),
        map((i) => reports[i])
      )
      .subscribe((fis) => {
        console.log(fis);

        const myServiceEndPoint = `/topic/${fis.printerName}`;
        const params: publishParams = { destination: myServiceEndPoint, body: JSON.stringify([fis]) };

        this.rxStompRPCService.rpc(params).subscribe(
          (message) => console.log(message),
          (err) => console.log(err)
        );
      });

    // reports.forEach((fis) => {
    //   console.log(fis);

    //   const myServiceEndPoint = `/topic/${fis.printerName}`;
    //   const params: publishParams = { destination: myServiceEndPoint, body: JSON.stringify([fis]) };

    //   this.rxStompRPCService.rpc(params).subscribe(
    //     (message) => console.log(message),
    //     (err) => console.log(err)
    //   );
    // });

    // const myServiceEndPoint = `/topic/nova.print`;
    // const params: publishParams = { destination: myServiceEndPoint, body: JSON.stringify(reports) };

    // this.rxStompRPCService.rpc(params).subscribe(
    //   (message) => console.log(message),
    //   (err) => console.log(err)
    // );
  }

  private getCopy(copy?: number): number {
    if (copy === undefined || copy === null || copy <= 0) {
      copy = 1;
    }

    return copy;
  }
}
