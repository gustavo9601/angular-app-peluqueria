import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {

    this.initiVariables();
  }

  ngOnInit() {

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
