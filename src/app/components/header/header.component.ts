import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from '../login/login.component';
import {Router} from '@angular/router';
import {AuthFirebaseService} from '../../services/auth-firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private router: Router,
              public _authServiceFirebase:AuthFirebaseService) {
  }

  ngOnInit() {
  }

  openLogin() {
    // Le podemos pasar directamente el componente que queremos abrir
    // Al estar en entrecomponentes se cargara dinamicamente
    this.modalService.open(LoginComponent);
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/']);
  }
}
