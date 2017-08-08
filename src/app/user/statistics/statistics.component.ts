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
  commits;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = null;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [], label: ""}
  ];

  constructor(private githubService: LoginService) { }

  ngOnInit() {
    this.myUsername = localStorage.username;
    this.githubService.getUserCommits(this.user.login).subscribe(
      commits => this.commits = commits,
      error => null,
      () => this.processUserData()
    )
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  processUserData() {
    //this.barChartLabels = [];
    let barChartLabelsTemp = [];
    let barChartDataTemp = [];
    let data = [];
    let dataLabel = 'Commits Per Day';
    for(var i = 0; i < this.commits.length; i++) {
      let commit = this.commits[i];
      if(commit.type == "PushEvent") {
        let commitDate = new Date(commit.created_at).toLocaleDateString();
        if(!barChartLabelsTemp.includes(commitDate))
          barChartLabelsTemp.push(commitDate);
        if(!barChartDataTemp[commitDate])
          barChartDataTemp[commitDate] = 0;

        barChartDataTemp[commitDate] += 1;
      }
    }
    for(var i = 0; i < barChartLabelsTemp.length; i++) {
      let label = barChartLabelsTemp[i];
      let val = barChartDataTemp[label];
      data.push(val);
    }

    let clone = JSON.parse(JSON.stringify(this.barChartData));
    console.log(clone);
    clone[0].data = data;
    clone[0].label = dataLabel;
    this.barChartData = clone;
    this.barChartLabels = barChartLabelsTemp;

    console.log(data, this.barChartData, this.barChartLabels);
  }

}
