import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddBookingComponent} from './components/add-booking/add-booking.component';
import {ListBookingsComponent} from './components/list-bookings/list-bookings.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'add-booking', component: AddBookingComponent
  },
  {
    path: 'list-bookings',
    component: ListBookingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'add-booking'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
