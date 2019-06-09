import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RandomNumberComponent } from './games/random-number/random-number.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'game/randomNumber',
    component: RandomNumberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
