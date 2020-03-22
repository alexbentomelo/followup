import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: Array<any> = [];


  constructor(
    public userService:UserServiceService,
    public navCtrl: NavController
  ) { }

  async ngOnInit() {
   
  }

  ionViewWillEnter() {
    this.getProjetos();
  }

  getProjetos() {

    this.userService.getDataList("/Empresa/Wcore/Fabrica de Software/Squads", dataReceived => {
      console.log(dataReceived) 
      this.projects = dataReceived;
     
    });
  }

}
