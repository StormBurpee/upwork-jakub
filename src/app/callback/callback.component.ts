import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
  providers: [LoginService]
})
export class CallbackComponent implements OnInit {

  private callback_code;
  private authenticate;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.callback_code = this.route.snapshot.queryParams['code'];
    this.authenticateLogin();
  }

  authenticateLogin() {
    this.loginService.authenticateLogin(this.callback_code).subscribe(
      resp => this.authenticate = resp,
      error => null,
      () => this.verifyAuthentication()
    );
  }

  verifyAuthentication() {
    localStorage.setItem("access_token", this.authenticate.access_token);
    this.router.navigate(['/home']);
  }

}
