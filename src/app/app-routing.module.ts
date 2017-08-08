import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importing the component that will handle the root page
import { IndexComponent } from './index/index.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

//defining our routes
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: []
  },
  {
    path: 'callback',
    component: CallbackComponent,
    children: []
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: "user/:username",
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
