import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[libSelectLabel]',
})
export class SelectLabelDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
