import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {

  infos = [];
  ref = firebase.database().ref('infos/');

  constructor(public router : Router, public loadingController : LoadingController, public alertController : AlertController){
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    })
  }

  addInfo(){
    this.router.navigate(['/add-info']);
  }

  edit(key){
    this.router.navigate(['/edit/'+key]);
  }

  async delete(key){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Esta seguro que desea borrar esta información?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancelar');
          }
        },{
          text: 'OK',
          handler: () => {
            firebase.database().ref('infos/'+key).remove();
          }
        }
      ]
    });

    await alert.present();
  }
}
