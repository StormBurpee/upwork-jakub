import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user;
  @Input() repos;

  constructor() { }

  ngOnInit() {
    this.user.formated_date = new Date(this.user.created_at).toUTCString();
    console.log(this.repos);
  }

}
