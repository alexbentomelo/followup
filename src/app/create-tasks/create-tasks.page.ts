import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.page.html',
  styleUrls: ['./create-tasks.page.scss'],
})
export class CreateTasksPage implements OnInit {


  projects: Array<any> = [];
  integrantes: Array<any> = [];
  projeto: String = "";
  peso: Number = 0;
  prioridade: String = "";
  descricao: String = "";
  titulo: String = "";
  notificacao: String = "";
  integrante: String = "";
  dataSelecionada: String = "";

  constructor( public userService:UserServiceService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,) { }

  ngOnInit() {
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

  selectSquad(e) {

    console.log(e)

    console.log(e.detail.value)

    this.projeto = e.detail.value;

    for(let i=0; i< this.projects.length; i++){
      if(this.projects[i].nome == this.projeto){
        this.integrantes = this.projects[i].integrantes;
      }
    }

    

    console.log(this.integrantes)

  }

  inserirTask(){
   console.log(this.dataSelecionada)
   console.log(this.peso)
   console.log(this.prioridade)
   console.log(this.notificacao)
   console.log(this.descricao)
   console.log(this.titulo)
   console.log(this.integrante)


  const ref = firebase.database().ref(`/Empresa/Wcore/Fabrica de Software/Backlog/${this.projeto}`).push();

  ref.set({
    id: ref.key,
    titulo:this.titulo,
    descricao:this.descricao,
    notificacao:this.notificacao,
    integrante:this.integrante,
    prioridade:this.prioridade,
    dataEntrega: this.dataSelecionada.slice(0, 10),
    peso:this.peso,
    status: "Backlog"

  });
  }
}
