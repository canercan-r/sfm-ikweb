import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() label1: string;
  @Input() label2: string;
  @Input() img: string;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  dismiss() {
    this.activeModal.close();
  }
}
