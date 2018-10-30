import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SalonListComponent} from './salon-list/salon-list.component';
import {SalonDetailsComponent} from './salon-details/salon-details.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {SalonService} from './salon.service';

@NgModule({
  declarations: [
    AppComponent,
    SalonListComponent,
    SalonDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SalonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
