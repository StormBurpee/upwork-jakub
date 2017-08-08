import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [LoginService]
})
export class UserComponent implements OnInit {

  user;
  username;

  constructor(private githubService: LoginService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParams['username'];
    this.getUser();
  }

  getUser() {
    this.githubService.getUser(this.username).subscribe(
      res => this.user = res,
      error => null
    );
  }

}
