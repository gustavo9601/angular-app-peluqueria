import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from '../models/booking';
import {Observable} from 'rxjs';
import {IBooking} from '../interfaces/ibooking';
import {map} from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  const;
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://apppeluqueriasreservas.firebaseio.com/';
  }

  addBooking(booking: Booking) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const url = this.url + 'bookings.json';

    // Parseamos la data de json a string, y con getData() se obtiene la info
    const body = JSON.stringify(booking.getData());
    console.log('data to send', body);
    return this.http.post(url, body, {headers});
  }

  getBooking(): Observable<IBooking[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    const url = this.url + 'bookings.json';
    return this.http.get<IBooking[]>(url, {headers}).pipe(
      map(data => {
        let bookings = [];
        if (data) {
          const today = new Date();
          // _.keys(iterable)  extrae las llaves del iterable objeto o lo que sea que venga por parametro
          _.forEach(_.keys(data), key => {
            // Al obtener las llaves que contiene el objeto, se le pasan como parametro a la Clase Booking para que cree un objeto de este tipo
            const booking = new Booking(data[key]);
            // Comparamos las reservas con la fecha actual, y solo devolvemos lo que sea maor a la fecha actual
            const bookingDate = new Date(booking.date);
            if (bookingDate.getTime() >= today.getTime()) {
              bookings.push(booking);
            }
          });
        }
        // Ordena los bookigns por fecha de reserva
        bookings = _.orderBy(bookings, b => b.date)
        return bookings;
      })
    );
  }

}
