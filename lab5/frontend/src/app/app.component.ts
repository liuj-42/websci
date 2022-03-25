import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  loggedin = false;
  lab4Show = true;
  lab5Show = false;

  ngOnInit(): void {
    if (searchParams.has("logged_in")) {
      console.log("logged in");
      this.loggedin = true;
    }
  }

  lab4() {
    this.lab4Show = true;
    this.lab5Show = false;
  }

  lab5() {
    this.lab4Show = false;
    this.lab5Show = true;
  }
}


let searchParams = new URLSearchParams(window.location.search);
