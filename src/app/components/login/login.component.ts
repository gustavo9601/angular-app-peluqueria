import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthFirebaseService} from '../../services/auth-firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public showLoginAlertSuccess: boolean;
  public showLoginAlertError: boolean;

  // NgbActiveModal retorna el objeto como si realizar un ViewChild

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private _authFirebaseService: AuthFirebaseService,
              private router: Router) {
    this.formLogin = this.fb.group({
      user: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });


    this.showLoginAlertSuccess = false;
    this.showLoginAlertError = false;
  }

  ngOnInit() {
  }

  autenticateUser() {
    this.showLoginAlertSuccess = false;
    this.showLoginAlertError = false;

    console.log(this.formLogin.value);

    this._authFirebaseService.login(this.formLogin.value).subscribe(
      (respuesta) => {
        console.log('respuesta login', respuesta);
        if (respuesta === true) {
          this.showLoginAlertSuccess = true;
          // Redirrecion
          this.router.navigate(['/list-bookings']);
          // Cierra el mdal
          this.activeModal.close();

          // Crea en local la autenticacion
          localStorage.setItem('logged', 'true');
        } else {
          this.showLoginAlertError = true;
        }
      }
    );

  }

  get user() {
    return this.formLogin.get('user');
  }

  get password() {
    return this.formLogin.get('password');
  }
}
