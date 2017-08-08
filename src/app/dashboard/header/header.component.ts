import { Component, OnInit, Input} from '@angular/core';
import { LoginService } from '../../login.service';

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit {

  @Input() user;
  searchResults;

  private searchSubject: Subject<any> = new Subject();

  constructor(private githubService: LoginService) {

  }

  ngOnInit() {
  }

}
