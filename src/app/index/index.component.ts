import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ LoginService ]
})
export class IndexComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
