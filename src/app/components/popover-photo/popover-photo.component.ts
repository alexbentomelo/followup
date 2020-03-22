import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-photo',
  templateUrl: './popover-photo.component.html',
  styleUrls: ['./popover-photo.component.scss'],
})
export class PopoverPhotoComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  getImage(data) {
    this.popoverController.dismiss(data);
  }

}
