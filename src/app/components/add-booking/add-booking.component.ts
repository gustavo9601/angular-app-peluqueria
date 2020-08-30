import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookingService} from '../../services/booking.service';
import {Booking} from '../../models/booking';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IBooking} from '../../interfaces/ibooking';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],

  encapsulation: ViewEncapsulation.None   // Restringe que los estilos del padre, u otra libreria entre en el hijo
})
export class AddBookingComponent implements OnInit {

  public options: string[];

  public locale: any;

  public today: Date;

  public formBooking: FormGroup;

  public temporalBookingsCreated: IBooking[];

  // @ViewChild('modal_success', {static: false}) modal_sucess;   el static superior a angular 8
  @ViewChild('modal_success') modal_sucess;
  @ViewChild('modal_exists') modal_exists;

  constructor(private fb: FormBuilder,
              private _bookingService: BookingService,
              private modalService: NgbModal) {

    this.initiVariables();
  }

  ngOnInit() {
    this.getAllBookings();
  }


  initiVariables() {
    this.options = ['haircut', 'hair-coloring', 'hair-washing', 'hair-straightening'];
    if (navigator.language === 'es-CO') {
      this.locale = {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Borrar'
      };
    } else {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    }

    // Inicializando el date
    this.today = new Date();
    // Seteando los valores de minutos y horas
    // En base a la logica que solo cada 30 min se puede crear una nueva cita
    if (this.today.getMinutes() < 30) {
      this.today.setMinutes(30);
    } else {
      this.today.setHours(this.today.getHours() + 1);
      this.today.setMinutes(0);
    }
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);

    // Inicializando el formulario
    this.formBooking = this.fb.group({
      name: this.fb.control('', Validators.required),
      date: this.fb.control(this.today),
      service: this.fb.control(this.options[0])
    });
  }


  addBooking() {
    console.log('this.formBooking.value', this.formBooking.value);
    // Cargando en la variable global los bookings creados
    this.getAllBookings();
    const booking = new Booking(this.formBooking.value);


    const bookingFound = _.find(this.temporalBookingsCreated, bookingTemporal => {
      // La verificacion si ya existe un booking en bd es por la fecha y time de creacion
      // ya que no se puede agendar en el mismo tiempo un booking
      const date = new Date(bookingTemporal.date);
      const dateNewBooking = new Date(booking.date);
      return date.getTime() === dateNewBooking.getTime();  // se compara si el time es igual en la info enviada con la que ya esta almacenada
    });


    console.log('bookingFound', bookingFound);
    // Si encontro alguna concidencia
    if (bookingFound) {
      this.modalService.open(this.modal_exists);
      return;
    } else {
      this._bookingService.addBooking(booking).subscribe(
        (respuesta) => {
          // Mostrando el modal seleccionado con el ViewChild
          this.modalService.open(this.modal_sucess);
          console.log('respuesta add booking', respuesta);
          this.formBooking.reset({
            name: '',
            date: this.today,
            service: this.options[0]
          });
        }
      );
    }
  }

  async getAllBookings() {
    return this._bookingService.getBooking().subscribe(
      (respuesta) => {
        console.log('respuesta getAllBookings', respuesta);
        this.temporalBookingsCreated = respuesta;
      }
    );
  }


  /*Gets del formulario*/
  get name() {
    return this.formBooking.get('name');
  }

  get date() {
    return this.formBooking.get('date');
  }

  get service() {
    return this.formBooking.get('service');
  }


}
