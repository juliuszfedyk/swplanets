import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlanetsComponent} from './components/planets/planets.component';
import {PlanetComponent} from './components/planet/planet.component';
import {HttpClientModule} from '@angular/common/http';
import { PlanetsLoaderComponent } from './components/planets-loader/planets-loader.component';
import {FormsModule} from '@angular/forms';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent,
    PlanetComponent,
    PlanetsLoaderComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
