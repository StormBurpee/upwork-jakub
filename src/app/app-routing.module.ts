import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importing the component that will handle the root page
import { IndexComponent } from './index/index.component';

//defining our routes
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
