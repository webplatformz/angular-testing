import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SalonListComponent} from './salon-list/salon-list.component';
import {SalonDetailsComponent} from './salon-details/salon-details.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './core/store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SalonEffects} from './core/store/salon/salon.effects';
import {SalonStore} from './core/store/salon/salon.store';

@NgModule({
  declarations: [
    AppComponent,
    SalonListComponent,
    SalonDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([SalonEffects]),
  ],
  providers: [SalonStore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
