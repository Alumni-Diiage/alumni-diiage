import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  resetPassword: boolean = false;
  
  @ViewChild('tabs') tabGroup?: MatTabGroup;

  constructor(
    public router: Router
  ) { }

  ngOnInit() { }

  onAccountCreated() {
    // Set the selected index to the login tab.
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = 0;
    }
  }
}
