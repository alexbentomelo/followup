import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  integrantes: Array<any> = [];
  projects: Array<any> = [];
  tasks: Array<any> = [];
  projeto: String = "";
  taskID: any = this.route.snapshot.paramMap.get('ref'); 
  projectName: String = "";
  projectID: String = "";
  peso: Number = 0;
  prioridade: String = "";
  descricao: String = "";
  titulo: String = "";
  notificacao: String = "";
  integrante: String = "";
  dataSelecionada: String = "";
  status: String = "";

  constructor(
    public userService:UserServiceService,
    public navCtrl: NavController, 
    public route: ActivatedRoute, 
    private router: Router,) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.taskID)
    let array = this.taskID;
    let sep = this.taskID.indexOf("&");
    this.projectName = this.taskID.slice(sep+1,array.length);
    console.log(array.length)
    console.log(sep)
    console.log(this.projectName)
    console.log(this.taskID.slice(0,sep))
    this.getProjetos();
    this.projectID = this.taskID.slice(0,sep);
    this.getTaskbyId(this.taskID.slice(0,sep));
  }

  getProjetos() {

    this.userService.getDataList("/Empresa/Wcore/Fabrica de Software/Squads", dataReceived => {
      console.log(dataReceived) 
      this.projects = dataReceived;
      for(let i=0; i< this.projects.length; i++){
        if(this.projects[i].nome == this.projectName){
          this.integrantes = this.projects[i].integrantes;
        }
      }
      
    });
  }

  getTaskbyId(id) {
      this.userService.getTaskbyId(`/Empresa/Wcore/Fabrica de Software/Backlog/${this.projectName}`,id, (dataReceived) => {
          
          this.dataSelecionada = dataReceived[0].dataEntrega;
          this.peso= dataReceived[0].peso;
          this.integrante = dataReceived[0].integrante;
          this.status = dataReceived[0].status;
          this.prioridade = dataReceived[0].prioridade;
          this.descricao = dataReceived[0].descricao;
          this.titulo = dataReceived[0].titulo;
          this.notificacao = dataReceived[0].notificacao;
          this.integrante = dataReceived[0].integrante;

        console.log(dataReceived[0]) 
    })
  }

  alterarTask(){
    console.log(this.dataSelecionada)
    console.log(this.peso)
    console.log(this.prioridade)
    console.log(this.notificacao)
    console.log(this.descricao)
    console.log(this.titulo)
    console.log(this.integrante)
 
 
   firebase.database().ref(`/Empresa/Wcore/Fabrica de Software/Backlog/${this.projectName}/${this.projectID}`).update({
     titulo:this.titulo,
     descricao:this.descricao,
     notificacao:this.notificacao,
     integrante:this.integrante,
     prioridade:this.prioridade,
     dataEntrega: this.dataSelecionada.slice(0, 10),
     peso:this.peso,
     status: this.status
 
   });
   }

}
