import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable,Observer} from 'rxjs/Rx';

/*
  Generated class for the SharedServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedServiceProvider {

  observable: any;
  observer: any;
  constructor() {
    this.observable = Observable.create(observer => {
      this.observer = observer;
    }).share();
  } 
  broadcast(event) {
    this.observer.next(event);
  }

  on(eventName, callback) {
    this.observable.filter((event) => {
      return event.name === eventName;
    }).subscribe(callback);
  }
  
  

}

