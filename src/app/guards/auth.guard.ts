import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthFirebaseService} from '../services/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authServiceFirebase: AuthFirebaseService, private router: Router) {
  }

  canActivate() {
    console.log('this._authServiceFirebase.isAuthenticated()', this._authServiceFirebase.isAuthenticated());
    if (this._authServiceFirebase.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
