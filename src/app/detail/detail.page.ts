import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router} from '@angular/router';

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  return item;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  id = '';
  info = {}

  constructor(private route : ActivatedRoute, public router : Router) { 
    firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('id')).on('value', resp => {
      this.info = snapshotToObject(resp);
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
