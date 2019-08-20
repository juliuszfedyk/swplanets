import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanetComponent} from './components/planet/planet.component';
import {PlanetsComponent} from './components/planets/planets.component';


const routes: Routes = [
  { path: '', component: PlanetsComponent},
  { path: ':id', component: PlanetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
