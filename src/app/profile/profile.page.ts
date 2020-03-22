import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { NavController, LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { PopoverPhotoComponent } from '../components/popover-photo/popover-photo.component';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Device } from '@ionic-native/device/ngx';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userArray: any=[];
  image: String;

  constructor(public userService: UserServiceService, 
              public loadingCtrl: LoadingController, 
              public toastCtrl: ToastController,
              private device: Device,
              private webview: WebView, 
              private camera: Camera,
              private crop: Crop, 
              public popoverController: PopoverController) { }
              

  ngOnInit() {

  }

  ionViewWillEnter() {

    this.userService.getUserDataByID("Empresa/Wcore/Fabrica de Software/Funcionarios",'alexander@wcore.com.br', (dataReceived) => {
      console.log(dataReceived[0]) 
      this.userArray = dataReceived[0];
      if(this.userArray.image){
        this.image = this.userArray.image;
      }
    })

  }

  uploadImageList(sourceType, destinationImage){
    let platform = this.device.platform;
    const options: CameraOptions = {
      targetWidth: 200,
      //targetHeight: 400,
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
     /*  destinationType:
        platform == "Android" ? this.camera.DestinationType.FILE_URI : platform == "IOS" ? this.camera.DestinationType.NATIVE_URI : this.camera.DestinationType.DATA_URL, */
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      if(options.destinationType == this.camera.DestinationType.DATA_URL) {
      let obj = this.userService.uploadUserImage(imageData);
      let task = obj.task;
      task.then(res => {
        obj.ref.getDownloadURL().subscribe(url => {
          this.image = url;
         // this.userService.updateUserProfileImage(this.image);
        })
      });
      task.percentageChanges().subscribe(change => {
        console.log('change: ', change);
      })}
      else{
        if (!imageData.includes("file://")) imageData = 'file://' + imageData;
        this.crop.crop(imageData, {quality: 100, targetWidth: 400, targetHeight: 400 })
        .then(
          newImage => {
            let img = "";
            img = this.webview.convertFileSrc(newImage);
            let obj = this.userService.uploadUserImage(img);
            let task = obj.task;
            task.then(res => {
              obj.ref.getDownloadURL().subscribe(url => {
                this.image = url;
              //  this.userService.updateUserProfileImage(this.image);
              })
            });
            task.percentageChanges().subscribe(change => {
              console.log('change: ', change);
            })
          },
          error => {
            console.error('Error cropping image', error);
            }
        );

      }
     });

  }

  async addImages(ev: any, callType: number) {
    console.log(ev);
    const popover = await this.popoverController.create({
      component: PopoverPhotoComponent,
      event: ev,
      translucent: true,
      cssClass: 'popover-photo'
    });

    popover.onDidDismiss()
    .then((result) => {
      if(result['data']=='image') this.uploadImageList(this.camera.PictureSourceType.PHOTOLIBRARY,callType);
      else if(result['data']=='camera') this.uploadImageList(this.camera.PictureSourceType.CAMERA,callType);
    });

    return await popover.present();
  }
 

}
