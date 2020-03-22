import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTasksPageRoutingModule } from './create-tasks-routing.module';

import { CreateTasksPage } from './create-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTasksPageRoutingModule
  ],
  declarations: [CreateTasksPage]
})
export class CreateTasksPageModule {}
