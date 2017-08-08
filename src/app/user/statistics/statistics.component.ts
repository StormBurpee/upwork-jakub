import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() user;
  myUsername;
  commits = [];
  received = [];


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  };
  public barChartLabels = null;
  public userLabels = null;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [], label: ""}
  ];
  public userData:any[] = [
    {data: [], label: ""}
  ];

  constructor(private githubService: LoginService) { }

  ngOnInit() {
    this.myUsername = localStorage.username;
    this.githubService.getUserCommits(this.user.login, 1).subscribe(
      commits => this.commits.push(commits),
      error => null,
      () => this.githubService.getUserCommits(this.user.login, 2).subscribe(
        commits => this.commits.push(commits),
        error => null,
        () => this.githubService.getUserCommits(this.user.login, 3).subscribe(
          commits => this.commits.push(commits),
          error => null,
          () => this.githubService.getUserCommits(this.user.login, 4).subscribe(
            commits => this.commits.push(commits),
            error => null,
            () => this.githubService.getUserCommits(this.user.login, 5).subscribe(
              commits => this.commits.push(commits),
              error => null,
              () => this.processUserData()
            )
          )
        )
      )
    )

    this.githubService.getUserReceived(this.user.login, 1).subscribe(
      received => this.received.push(received),
      error => null,
      () => this.githubService.getUserReceived(this.user.login, 2).subscribe(
        received => this.received.push(received),
        error => null,
        () => this.githubService.getUserReceived(this.user.login, 3).subscribe(
          received => this.received.push(received),
          error => null,
          () => this.processReceived()
        )
      )
    )
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  processReceived() {
    let friends = [];
    let friendData = [];
    let friendLabels = [];
    for(var i = 0; i < this.received.length; i++) {
      let receivedParent = this.received[i];
      for(var j = 0; j < receivedParent.length; j++) {
        let received = receivedParent[j];
        if(!friends[received.actor.login])
          friends[received.actor.login] = {value: 0, name: received.actor.login};
        if(!friendLabels.includes(received.actor.login))
          friendLabels.push(received.actor.login);
        friends[received.actor.login].value += 1;
      }
    }
    for(var i = 0; i < friendLabels.length; i++) {
      let friendlabel = friendLabels[i];
      friendData.push(friends[friendlabel].value);
    }

    let clone = JSON.parse(JSON.stringify(this.userData));
    console.log(clone);
    clone[0].data = friendData;
    clone[0].label = "User Received Interactions";
    this.userData = clone;
    this.userLabels = friendLabels;

    console.log(friendData);
  }

  processUserData() {
    //this.barChartLabels = [];
    let barChartLabelsTemp = [];
    let barChartDataTemp = [];
    let data = [];
    let dataLabel = 'Commits Per Day';
    for(var i = 0; i < this.commits.length; i++) {
      let commitParent = this.commits[i];
      for(var j = 0; j < commitParent.length; j++) {
        let commit = commitParent[j];
        if(commit.type == "PushEvent") {
          let commitDate = new Date(commit.created_at).toLocaleDateString();
          if(!barChartLabelsTemp.includes(commitDate))
            barChartLabelsTemp.push(commitDate);
          if(!barChartDataTemp[commitDate])
            barChartDataTemp[commitDate] = 0;

          barChartDataTemp[commitDate] += 1;
        }
      }
    }
    for(var i = 0; i < barChartLabelsTemp.length; i++) {
      let label = barChartLabelsTemp[i];
      let val = barChartDataTemp[label];
      data.push(val);
    }

    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    clone[0].label = dataLabel;
    this.barChartData = clone;
    this.barChartLabels = barChartLabelsTemp;
  }

}
