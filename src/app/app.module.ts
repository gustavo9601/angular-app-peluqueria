import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';

// Modules
import {AppRoutingModule} from './app-routing.module';
// npm install --save @ng-bootstrap/ng-bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule} from 'primeng/calendar';


// Components
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TranslateService} from './services/translate.service';
import {TranslatePipe} from './pipes/translate.pipe';
import {HeaderComponent} from './components/header/header.component';
import {AddBookingComponent} from './components/add-booking/add-booking.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Funcion que inicializara el servicio de translate
export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}


@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    AddBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // De esta forma se provee el servicio para que arranque al iniciar la aplicacion
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,   // Funcion que ejecuta la inicializacion del servicio
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
