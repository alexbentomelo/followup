import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.page.html',
  styleUrls: ['./list-tasks.page.scss'],
})
export class ListTasksPage implements OnInit {

  tasks: Array<any> = [];
  projeto: String = "";
  projectID: any = this.route.snapshot.paramMap.get('ref'); 

  constructor( public userService:UserServiceService,
    public navCtrl: NavController, public route: ActivatedRoute, 
    private router: Router,) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.getProjetos();
  }

  getProjetos() {

    this.userService.getDataList(`/Empresa/Wcore/Fabrica de Software/Backlog/${this.projectID}`, dataReceived => {
      console.log(dataReceived) 
      this.tasks = dataReceived;
     
    });
  }

}
