import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {


  const;
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://apppeluqueriasreservas.firebaseio.com/';
  }


  login(infologin: any): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const url = this.url + 'users.json';

    // Obtenemos la lista de todos los usuarios
    return this.http.get<boolean>(url, {headers}).pipe(
      map(
        (users) => {
          const user = _.find(users, u => {
            // Se veifica si alguno de los usuarios retornados en el get, concuerda con las credenciales enviadas
            return u.user == infologin.user && u.password == infologin.password;
          });

          // Si encontro almenos un usuario
          if (user) {
            return true;
          } else {
            return false;
          }

        }
      )
    );
  }


  isAuthenticated(){
   return localStorage.getItem('logged') ? true : false;
  }

}
