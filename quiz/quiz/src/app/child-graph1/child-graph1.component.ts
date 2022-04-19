
import { HttpService } from './../http.service';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-child-graph1',
  templateUrl: './child-graph1.component.html',
  styleUrls: ['./child-graph1.component.css']
})
export class ChildGraph1Component implements OnInit {
  show: boolean = false;

  @Output() child1 = new EventEmitter<string>();
  showGraph() {
    this.show = true;
    this.child1.emit("1")
  }
  ngOnInit(): void {
    
  }

}
