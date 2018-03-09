import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SharedServiceProvider} from '../../providers/shared-service/shared-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private sharedService: SharedServiceProvider) {
      this.sharedService.on('example', (event) => {
        //Any method goes here to update UI
    });
    }
  

}
