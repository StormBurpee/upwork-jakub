import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HeaderComponent } from '../dashboard/header/header.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [LoginService]
})
export class UserComponent implements OnInit {

  user;
  processedEvents;
  myEvents;
  repos;
  username;

  constructor(private githubService: LoginService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    //this.username = "StormBurpee";
    this.getUser();
  }

  getUser() {
    this.githubService.getUser(this.username).subscribe(
      res => this.user = res,
      error => null,
      () => this.postUser()
    );
  }

  postUser() {
    this.getMyEvents();
    this.getRepos();
  }

  getRepos() {
    this.githubService.getUserRepos(this.username).subscribe(
      repos => this.repos = repos
    )
  }

  getMyEvents() {
    this.githubService.getUserEvents(this.username).subscribe(
      resp => this.myEvents = resp,
      error => null,
      () => this.processEvents()
    )
  }

  processEvents() {
    let processed = {
      CreateEvent: {
        name: "CreateEvent",
        count: 0
      },
      PushEvent: {
        name: "PushEvent",
        count: 0
      },
      PullRequestEvent: {
        name: "PullRequestEvent",
        count: 0
      }
    };
    for(var i = 0; i < this.myEvents.length; i++) {
      let event = this.myEvents[i];
      if(processed[event.type]) {
        processed[event.type].count += 1;
      } else {
        processed[event.type] = {
          name: event.type,
          count: 1
        };
      }
    }
    this.processedEvents = processed;
    console.log("events", processed);
  }

}
