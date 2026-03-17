import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'lib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() name: string;
  @Input() rows: string;
  @Input() maxlength?: string;
  @Input() readonly?: boolean;

  control: FormControl;

  constructor(@Optional() @Self() private readonly ngCtrl: NgControl) {
    if (!ngCtrl) {
      throw new Error('lib textarea component formcontrolname veya ngmodel olmadan kullanılamaz');
    }
    ngCtrl.valueAccessor = this;
  }
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    this.control = this.ngCtrl.control as FormControl;
  }
}
