import { Pipe, PipeTransform } from "@angular/core";
import { IMekan } from "@cv-models/cv";

@Pipe({ name: 'mekansWith' })
export class AutocompletePipeMekanssWith implements PipeTransform {
  public transform(collection: IMekan[], term = '') {
    return collection.filter((item) => item.mekanAdi.toString().toTurkishLowerCase().includes(term.toTurkishLowerCase()));
  }
}
