import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  loggedin = false;

  ngOnInit(): void {
    if (searchParams.has("logged_in")) {
      console.log("logged in");
      this.loggedin = true;
    }
  }
}


let searchParams = new URLSearchParams(window.location.search);
