import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
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

  key='';
  infos = [];
  ref = firebase.database().ref('infos/');

  constructor(public router : Router, public loadingController : LoadingController, public alertController : AlertController, private activatedRoute:ActivatedRoute, public navCtrl:NavController){
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    })
  }

  sendInfo(){
    this.router.navigateByUrl(`/detail/${this.key}`);
  }

  addInfo(){
    this.router.navigate(['/add-info']);
  }

  edit(key){
    this.router.navigateByUrl(`/edit/${this.key}`);
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
