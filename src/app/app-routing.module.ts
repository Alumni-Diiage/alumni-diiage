import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const homeModule = () => import('./features/home/home.module').then( m => m.HomeModule); 
const eventsModule = () => import('./features/events/events.module').then( m => m.EventsModule); 


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: homeModule
      },
      {
        path: 'events',
        loadChildren: eventsModule
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
