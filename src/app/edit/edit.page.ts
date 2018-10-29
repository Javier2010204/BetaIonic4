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

  constructor(private route: ActivatedRoute, public router:Router, private formBuilder:FormBuilder) { 
    this.infoForm = this.formBuilder.group({
      'info_title' : [null, Validators.required],
      'info_description' : [null, Validators.required]
    });
    this.getInfo(this.route.snapshot.paramMap.get('key'));
  }

  getInfo(key){
    firebase.database().ref('infos/'+key).on('value', resp => {
      let info = snapshotToObject(resp);
      this.infoForm = this.formBuilder.group({
        'info_title' : [null, Validators.required],
        'info_description' : [null, Validators.required]
      });
    })
  }

  updateInfo(){
    let newInfo = firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('key')).update(this.infoForm.value);
    this.router.navigate(['/detail/'+this.route.snapshot.paramMap.get('key')]);
  }

  ngOnInit() {
  }

}
