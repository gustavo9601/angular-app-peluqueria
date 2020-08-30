import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any;

  constructor(private http: HttpClient) {
  }

  public getData() {
    return new Promise((resolve, reject) => {

      // navigator.language  // retorna el idioma del navegador en-US  es-CO es-ES

      this.http.get('assets/translations/' + navigator.language + '.json').subscribe(
        (respuesta) => {
          this.data = respuesta;
          console.log('Traducciones cargadas', this.data);
          resolve(true);
        },
        (error) => {
          console.log('Error al recuperar las traducciones');
          reject(error);
        }
      );
    });
  }


  public getTranslate(word: string) {
    return this.data[word];
  }

}
