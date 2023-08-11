import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';


const authModule = () => import('./auth/auth.module').then( m => m.AuthModule); 
const homeModule = () => import('./features/home/home.module').then( m => m.HomeModule); 
const eventsModule = () => import('./features/events/events.module').then( m => m.EventsModule); 
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);


const routes: Routes = [
  {
    path: 'auth',
    component: LoginLayoutComponent,
    loadChildren: authModule
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
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
