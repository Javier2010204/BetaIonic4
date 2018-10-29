import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDI1fRFRcbwAwIK_JrFu_aHDH0Y1bTJqS8",
  authDomain: "moto-sastre-76ff4.firebaseapp.com",
  databaseURL: "https://moto-sastre-76ff4.firebaseio.com",
  projectId: "moto-sastre-76ff4",
  storageBucket: "moto-sastre-76ff4.appspot.com",
  messagingSenderId: "797312886690"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
