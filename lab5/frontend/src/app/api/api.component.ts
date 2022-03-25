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
    let num_ = parseInt(num) as number;
    if (num === "") {
      this.httpService.getRequest(`http://localhost:3000/db`).subscribe(data => {
        console.log(data)
      });
    } else {
      this.httpService.getRequest(`http://localhost:3000/db/${num}`).subscribe(data => {
        console.log(data)
      });
    }
  }

  postCall(num: string, body: string) {
    console.log(body)
    if (num === "") {
      this.httpService.postRequest(`http://localhost:3000/db`, body).subscribe(data => {
        console.log(data)
      });
    } else {
      // cant do this
    }
  }

  putCall(num: string, body: string) {
    let num_ = parseInt(num) as number;
    if (num === "") {
      this.httpService.putRequest(`http://localhost:3000/db`, body).subscribe(data => {
        console.log(data)
      });
    } else {
      this.httpService.putRequest(`http://localhost:3000/db/${num}`, body).subscribe(data => {
        console.log(data)
      });
    }
  }

  deleteCall(num: string) {
    if (num === "") {
      this.httpService.deleteRequest(`http://localhost:3000/db`).subscribe(data => {
        console.log(data)
      });
    } else {
      this.httpService.deleteRequest(`http://localhost:3000/db/${num}`).subscribe(data => {
        console.log(data)
      });
    }
  }

}
