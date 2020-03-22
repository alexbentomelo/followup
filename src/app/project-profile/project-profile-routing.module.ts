import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectProfilePage } from './project-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectProfilePageRoutingModule {}
