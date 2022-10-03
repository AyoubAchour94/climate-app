import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StorageModule } from '@ngx-pwa/local-storage';
import { EffectsModule } from '@ngrx/effects';
import {
  NbThemeModule,
  NbLayoutModule,
  NbListModule,
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbFormFieldModule,
  NbAutocompleteModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { reducers, metaReducers } from './lib/store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WeatherEffects } from './lib/store/effects/weather.effects';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { UiAutocompleteComponent } from './lib/components/ui-autocomplete/ui-autocomplete.component';
import { BrightenDirective } from './lib/directives/brighten.directive';
import { MainInterceptor } from './lib/interceptors/main.interceptor';
import { UiSlideComponent } from './lib/components/ui-slide/ui-slide.component';

@NgModule({
  declarations: [
    BrightenDirective,
    AppComponent,
    HomeComponent,
    UiAutocompleteComponent,
    UiSlideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbAutocompleteModule,
    NbListModule,
    NbEvaIconsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([WeatherEffects]),
    StorageModule.forRoot({ IDBNoWrap: true }),
    CarouselModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }