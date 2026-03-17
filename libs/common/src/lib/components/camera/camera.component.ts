import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CAMERA_MODE } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
  @Input() camIsReady = false;
  @Input() webCamMode = CAMERA_MODE.CAMERA;
  @Input() webCamMediaStream: MediaStream;

  CAMERA_MODE = CAMERA_MODE;

  constructor(
    private activeModal: NgbActiveModal,
    private readonly _cdr: ChangeDetectorRef,
  ) { }

  take() {
    const canvas: HTMLCanvasElement = document.getElementById('canvas-for-photo') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
    context.drawImage(video, 0, 0, 250, 200);
    this.webCamMode = CAMERA_MODE.PHOTO;
    this._cdr.detectChanges();
  }

  apply() {
    const canvas: HTMLCanvasElement = document.getElementById('canvas-for-photo') as HTMLCanvasElement;
    const imgBase64 = canvas.toDataURL();
    const splt = imgBase64.split(';base64,');
    if (splt.length === 2) {
      const resim = splt[1];
      this.activeModal.close(resim);
      this._cdr.detectChanges();
    }
  }

  dismiss() {
    if (this.webCamMediaStream && this.webCamMediaStream.getTracks().length > 0) {
      this.webCamMediaStream.getTracks()[0].stop();
      this.activeModal.close();
    }
  }
}
