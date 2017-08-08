import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private githubService: LoginService) { }

  username;
  loginResult;
  logs;
  debug;

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
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public pagedata:any[] = [
    {data: [], label: ""}
  ];
  public githubdata:any[] = [
    {data: [], label: ""}
  ];
  public pagelabels = null;
  public githublabels = null;

  ngOnInit() {
    this.username = localStorage.username;
    this.githubService.adminLogin(this.username).subscribe(
      lr => this.loginResult = lr,
      error => null,
      () => this.handleLogin()
    )
  }

  handleLogin() {
    if(this.loginResult.auth == false) {
      this.router.navigate(['/']);
    } else {
      this.logsAndDebug();
    }
  }

  logsAndDebug() {
    this.githubService.adminLogs().subscribe(
      resp => this.logs = resp,
      () => null,
      () => this.displayLogs()
    )
    this.githubService.serverDebug().subscribe(
      resp => this.debug = resp,
      () => null,
      () => this.displayDebug()
    )
  }

  displayLogs() {
    let pageLogs = [];
    let gpageLogs = [];
    let pageL = [];
    let gpageL = [];
    let ud = [];
    let gd = [];
    for(var i = 0; i < this.logs.pageRequests.length; i++) {
      let log = this.logs.pageRequests[i];
      if(!pageLogs[log.endpoint])
        pageLogs[log.endpoint] = {value: 0, endpoint: log.endpoint};
      if(!pageL.includes(log.endpoint))
        pageL.push(log.endpoint);
      pageLogs[log.endpoint].value += 1;
    }

    for(var i = 0; i < this.logs.githubRequests.length; i++) {
      let log = this.logs.githubRequests[i];
      if(!gpageLogs[log.endpoint])
        gpageLogs[log.endpoint] = {value: 0, endpoint: log.endpoint};
      if(!gpageL.includes(log.endpoint))
        gpageL.push(log.endpoint);
      gpageLogs[log.endpoint].value += 1;
    }

    for(var i = 0; i < pageL.length; i++) {
      let l = pageL[i];
      ud.push(pageLogs[l].value);
    }
    for(var i = 0; i < gpageL.length; i++) {
      let l = gpageL[i];
      gd.push(gpageLogs[l].value);
    }

    let clone = JSON.parse(JSON.stringify(this.pagedata));
    clone[0].data = ud;
    clone[0].label = "Page views by page";
    this.pagedata = clone;
    this.pagelabels = pageL;

    clone = JSON.parse(JSON.stringify(this.githubdata));
    clone[0].data = gd;
    clone[0].label = "Api Requests by Request";
    this.githubdata = clone;
    this.githublabels = gpageL;

  }

  displayDebug() {

  }

}
