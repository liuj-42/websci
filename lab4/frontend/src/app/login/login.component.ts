import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from '../http.service';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ViewChild,AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  isModalShown = true;

  showModal(): void {
    this.isModalShown = true;
  }
 
  hideModal(): void {
    this.autoShownModal?.hide();
  }
 
  onHidden(): void {
    this.isModalShown = false;
  }


  constructor(private modalService: BsModalService, private httpService: HttpService) {}



  test(url: string) {
    this.httpService.testGet(url).subscribe((data) => {
      console.log(data);
    })
  }



}
