import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from './http-manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  providers: [HttpManagerService]
})
export class ManagerComponent implements OnInit {

  constructor(private httpManagerService: HttpManagerService) { }

  ngOnInit() {
    this.httpManagerService.trackParser(26332).subscribe(res => {
      console.log(res);
      });

  }

}
