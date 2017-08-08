import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginService]
})
export class DashboardComponent implements OnInit {

  access_token = "";
  user;
  myRepos;

  constructor(private githubService: LoginService) { }

  ngOnInit() {
    this.access_token = localStorage.access_token;
    this.getUserDetails();
  }

  getUserDetails() {
    this.githubService.getMyUser(this.access_token).subscribe(
      res => this.user = res,
      error => null,
      () => this.afterUser()
    );
  }

  afterUser() {
    this.githubService.getUserRepos(this.user.login).subscribe(
      repos => this.myRepos = repos
    )
  }

}
