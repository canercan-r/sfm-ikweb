import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'cv-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Output() nameChange = new EventEmitter<{ name: string; value: string }>();

  @Input() label: string;
  @Input() name: string;
  @Input() rows: string | number;
  @Input() maxlength?: string;
  @Input() readonly?: boolean;
  @Input() helperText?: string;
  @Input() errorText?: string;
  @Input() formButton?: boolean;
  @Input() inputGroupType?: 'line' | 'box' | 'border' | 'search' = 'border';
  @Input() disabled?: boolean;
  @Input() required = false;

  control: FormControl;

  constructor(@Optional() @Self() private readonly ngCtrl: NgControl) {
    if (!ngCtrl) {
      throw new Error('cv textarea component formcontrolname veya ngmodel olmadan kullanılamaz');
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

  nameChanging(name, a) {
    let value = a.target.value;
    this.nameChange.emit({ name, value }); // this will pass the $event object to the parent component.
  }
}
