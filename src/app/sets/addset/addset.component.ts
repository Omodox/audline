import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../adm/admin.service';

@Component({
  selector: 'app-addset',
  templateUrl: './addset.component.html',
  styleUrls: ['./addset.component.scss'],
  providers: [AdminService]
})
export class AddsetComponent implements OnInit {

  url = 'https://zk.fm/download/';
  name;
  performer_name;
  performer_url;

  constructor(private adminService : AdminService) { }

  ngOnInit() {
  }

  sid = localStorage.getItem('sid');

  send(form) {
    // console.log(form.value);

    this.adminService.addNewTrack(form.value,this.sid).subscribe(res => {
      console.log(res);
    });

    this.name = '';
    this.performer_name = '';
    this.url = 'https://zk.fm/download/';
    this.performer_url = '';

  }

}
