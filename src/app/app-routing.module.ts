import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-tasks',
    loadChildren: () => import('./create-tasks/create-tasks.module').then( m => m.CreateTasksPageModule)
  },
  {
    path: 'list-tasks/:ref',
    loadChildren: () => import('./list-tasks/list-tasks.module').then( m => m.ListTasksPageModule)
  },
  {
    path: 'view-task',
    loadChildren: () => import('./view-task/view-task.module').then( m => m.ViewTaskPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'project-profile/:ref',
    loadChildren: () => import('./project-profile/project-profile.module').then( m => m.ProjectProfilePageModule)
  },
  {
    path: 'update-task/:ref',
    loadChildren: () => import('./update-task/update-task.module').then( m => m.UpdateTaskPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
