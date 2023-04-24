import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequirementService } from './requirement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'simple-budget-app';
  isLoggedIn: boolean = false;

  constructor(private service: RequirementService, private router: Router) {}

  ngDoCheck(): void {
    if (this.service.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
    // if (this.service.isLoggedIn()) {
    //   this.isLoggedIn = true;
    // } else {
    //   this.isLoggedIn =  false;
    // }
  }

  toLogout(): void {
    this.service.setLoggedOut();
    this.router.navigate(['/auth/login']);
  }
}
