import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray} from '@angular/forms';

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  return item;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  ref = firebase.database().ref('infos/');
  infoForm:FormGroup;
  key=null;

  constructor(private route: ActivatedRoute, public router:Router, private formBuilder:FormBuilder) { 
    this.infoForm = this.formBuilder.group({
      'info_title' : [null, Validators.required],
      'info_description' : [null, Validators.required]
    });
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('id');
    if(this.key){
      this.getInfo(this.key);
    }
  }

  getInfo(key){
    firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('id')).on('value', resp => {
      let info = snapshotToObject(resp);
      console.log(resp.val());
      this.infoForm = this.formBuilder.group({
        'info_title' : [resp.val().info_title, Validators.required],
        'info_description' : [resp.val().info_description, Validators.required]
      });
    })
    

  }

  updateInfo(){
    let newInfo = firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('id')).update(this.infoForm.value);
    this.router.navigate(['/detail/'+this.route.snapshot.paramMap.get('id')]);
  }

}
