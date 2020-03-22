import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.page.html',
  styleUrls: ['./project-profile.page.scss'],
})
export class ProjectProfilePage implements OnInit {
  
  
  projectID: any = this.route.snapshot.paramMap.get('ref'); 
  
  projectProfileArray:  any=[];

  constructor( public userService:UserServiceService,
               public navCtrl: NavController,
               public route: ActivatedRoute, 
               private router: Router,) { }

  ngOnInit() {

              }
            

 ionViewWillEnter() {
    console.log(this.projectID)
    this.userService.getDataByName("/Empresa/Wcore/Fabrica de Software/Squads",this.projectID, (dataReceived) => {
      console.log(dataReceived[0])
      this.projectProfileArray = dataReceived[0];
      console.log(this.projectProfileArray.nome)
    })


  }


}
