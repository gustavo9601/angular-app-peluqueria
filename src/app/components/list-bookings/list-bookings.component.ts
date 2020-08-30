import {Component, OnInit} from '@angular/core';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/booking.service';
import {IBooking} from '../../interfaces/ibooking';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {

  public listBookings: IBooking[];
  public loadBookings: boolean;

  constructor(private _bookingService: BookingService) {
    this.listBookings = [];
    this.loadBookings = false;
  }

  ngOnInit() {
    this.loadBookings = true;
    this._bookingService.getBooking().subscribe(
      (respuesta) => {
        this.listBookings = respuesta;
        console.log('this.listBookings', this.listBookings);
      },
      () => {
      },
      () => {
        this.loadBookings = false;
      }
    );
  }

}
