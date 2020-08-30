import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '../services/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private _translatorService: TranslateService) {
  }

  // Pipe que recibe un string, y buscara su correspondencia en el servicio
  // Para retornar el idioma
  transform(word: string, args?: any): any {
    return this._translatorService.getTranslate(word);
  }

}
