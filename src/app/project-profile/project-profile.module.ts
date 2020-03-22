import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectProfilePageRoutingModule } from './project-profile-routing.module';

import { ProjectProfilePage } from './project-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectProfilePageRoutingModule
  ],
  declarations: [ProjectProfilePage]
})
export class ProjectProfilePageModule {}
