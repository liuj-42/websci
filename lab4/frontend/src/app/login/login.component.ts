import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService: HttpService) { }


  ngOnInit(): void {
    this.httpService.sendGetRequest().subscribe((data) => {
      console.log(data);
    })
  }

}
