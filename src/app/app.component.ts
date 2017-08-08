import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService]
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private githubService: LoginService) {
    router.events.subscribe(
      resp => this.updateServer(resp)
    );
  }

  updateServer(resp) {
    if(resp.constructor.name == "NavigationEnd") {
        console.log(resp);
        this.githubService.updateServer('page', 'navigation'+resp.url.replace('/', ':').replace('/', ':'));
    }
  }
}
