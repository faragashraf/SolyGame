import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiplicationTableComponent } from './multiplication-table/multiplication-table.component';
import { SumGameComponent } from './sum-game/sum-game.component';
import { MenuComponent } from './menu/menu.component';
import { BrickBreakerComponent } from './brick-breaker/brick-breaker.component';

const routes: Routes = [
  { path: 'multiplication', component: MultiplicationTableComponent },
  { path: 'addition', component: SumGameComponent },
  { path: 'BrickBreaker', component: BrickBreakerComponent },
  { path: '', component: MenuComponent },
  { path: '**', redirectTo: '' } // Redirect any other route to the menu
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
