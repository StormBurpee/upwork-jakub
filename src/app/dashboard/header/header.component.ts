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
  username;

  private searchSubject: Subject<any> = new Subject();

  constructor(private githubService: LoginService) {
    this.searchSubject.debounceTime(450).distinctUntilChanged().subscribe(
      term => this.doSearch(term)
    )
  }

  ngOnInit() {
    this.username = localStorage.username;
  }

  searchChanged(term) {
    this.searchSubject.next(term);
  }

  doSearch(term) {
    this.githubService.searchUser(term).subscribe(
      results => this.searchResults = results,
      error => null
    )
  }

}
