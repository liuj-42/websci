import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private HttpClient: HttpClient) { }

  getData1() {
    return this.HttpClient.get("http://localhost:3000/mongo/1")
  }
  
  getData2() {
    return this.HttpClient.get("http://localhost:3000/mongo/2")
  }

  getData3() {
    return this.HttpClient.get("http://localhost:3000/mongo/3")
  }
}
