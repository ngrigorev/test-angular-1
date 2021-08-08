import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent, OrderPageComponent } from './components';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'order/:id', component: OrderPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
