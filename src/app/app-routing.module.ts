import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-module/login.component';
import { accessGuard } from './utlis/guards/access.guard';
import { loggedOutGuard } from './utlis/guards/loggedOut.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login-module/login.module').then((m) => m.LoginModule),
    canActivate: [loggedOutGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-module/admin.module').then((m) => m.adminModule),
    canActivate: [accessGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./customer-module/customer.module').then((m) => m.CustomerModule),
    canActivate: [accessGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
