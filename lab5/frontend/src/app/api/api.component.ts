import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor( private httpService: HttpService) {}

  ngOnInit(): void {
  }


  getCall(num: string) {
    let out: string = "<span style='color:green'> success </span>";
    if (num === "") {
      this.httpService.getRequest(`http://localhost:3000/db`).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    } else {
      this.httpService.getRequest(`http://localhost:3000/db/${num}`).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    }
    let outHTML = document.getElementById("output") as HTMLElement;
    outHTML.innerHTML = out;
  }

  postCall(num: string, body: string) {
    let out: string = "<span style='color:green'> success </span>";
    if (num === "") {
      this.httpService.postRequest(`http://localhost:3000/db`, body).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    } else {
      out = "<span style='color:red'> error </span>";
    }
    let outHTML = document.getElementById("output") as HTMLElement;
    outHTML.innerHTML = out;
  }

  putCall(num: string, body: string) {
    let out: string = "<span style='color:green'> success </span>";
    if (num === "") {
      this.httpService.putRequest(`http://localhost:3000/db`, body).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    } else {
      this.httpService.putRequest(`http://localhost:3000/db/${num}`, body).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    }
    let outHTML = document.getElementById("output") as HTMLElement;
    outHTML.innerHTML = out;
  }

  deleteCall(num: string) {
    let out: string = "<span style='color:green'> success </span>";
    if (num === "") {
      this.httpService.deleteRequest(`http://localhost:3000/db`).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    } else {
      this.httpService.deleteRequest(`http://localhost:3000/db/${num}`).subscribe(data => {
        console.log(data)
      }, error => {
        console.log(error)
        out = "<span style='color:red'> error </span>";
      });
    }
    let outHTML = document.getElementById("output") as HTMLElement;
    outHTML.innerHTML = out;
  }

}
