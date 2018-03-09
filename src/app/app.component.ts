import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {OneSignal} from '@ionic-native/onesignal';

import {SharedServiceProvider}from '../providers/shared-service/shared-service';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, private oneSignal: OneSignal, splashScreen: SplashScreen, private sharedService: SharedServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      var notificationOpenedCallback = function (jsonData) {
        if (jsonData != null) {
            if (jsonData["type"] == "example") {
                this.sharedService.broadcast({
                    name: 'example'
                });
            }
        }
    };

    try {
        var iosSettings = {};
        iosSettings["kOSSettingsKeyAutoPrompt"] = true;
        iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

        window["plugins"].OneSignal.startInit("key", "key")
            .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.None)
            .iOSSettings(iosSettings)
            .handleNotificationReceived(function (jsonData) {
                if (jsonData["payload"] != null && jsonData["payload"]["additionalData"] != null) {
                    var data = jsonData["payload"]["additionalData"];
                    notificationOpenedCallback(data);
                }

            })
            .handleNotificationOpened(function (jsonData) {
                if (jsonData["notification"] != null && jsonData["notification"]["payload"] != null) {
                    var data = jsonData["notification"]["payload"]["additionalData"];
                    notificationOpenedCallback(data);
                }
            })
            .endInit();

    } catch (err) {
        try {
           //Failed to load oneSignal
            alert(err);
        } catch (err) { }
    }
});
}
}


