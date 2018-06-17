import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../adm/admin.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AdminService]
})
export class AddComponent implements OnInit {

  url = '';
  name;
  performer_name;
  performer_url;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  sid = localStorage.getItem('sid');

  send(form) {

    this.adminService.addNewTrack(form.value,this.sid).subscribe(res => {
      console.log(res);
    });

    this.name = '';
    this.performer_name = '';
    this.url = '';
    this.performer_url = '';

    this.performer_name = form.value.performer_name;

  }

}
