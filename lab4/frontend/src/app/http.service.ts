import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiServer = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.apiServer);
  }

  public testGet(url: string) {
    return this.httpClient.get(url);
  }
}
