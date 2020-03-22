import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTasksPage } from './list-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: ListTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTasksPageRoutingModule {}
