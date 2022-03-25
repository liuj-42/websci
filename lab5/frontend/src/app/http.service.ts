import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiServer = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  public getRequest(url: string) {
    return this.httpClient.get(url);
  }

  public postRequest(url: string, body: string) {
    return this.httpClient.post(url, {data: body});
  }

  public putRequest(url: string, body:string) {
    return this.httpClient.put(url, {data: body});
  }

  public deleteRequest(url: string) {
    return this.httpClient.delete(url);
  }
}
