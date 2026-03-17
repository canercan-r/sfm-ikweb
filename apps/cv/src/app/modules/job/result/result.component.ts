import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedService } from '@cv-services/shared.service';

@Component({
  selector: 'cv-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  constructor(
    public readonly sharedService: SharedService
  ) {

  }
}
