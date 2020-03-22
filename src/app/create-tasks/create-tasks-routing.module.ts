import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTasksPage } from './create-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTasksPageRoutingModule {}
