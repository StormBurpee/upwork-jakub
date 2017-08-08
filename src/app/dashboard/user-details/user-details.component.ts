import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../login.service'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [LoginService]
})
export class UserDetailsComponent implements OnInit {

  @Input() user;
  @Input() repos;
  myEvents;
  myStarred;
  processedEvents = null;

  constructor(private githubService: LoginService) { }

  ngOnInit() {
    this.user.formated_date = new Date(this.user.created_at).toUTCString();
    console.log(this.repos);
    this.getMyEvents();
    this.getMyStarred();
  }

  getMyEvents() {
    this.githubService.getUserEvents(this.user.login).subscribe(
      resp => this.myEvents = resp,
      error => null,
      () => this.processEvents()
    )
  }

  getMyStarred() {
    this.githubService.getUserStarred(this.user.login).subscribe(
      resp => this.myStarred = resp
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
