import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-graph2',
  templateUrl: './child-graph2.component.html',
  styleUrls: ['./child-graph2.component.css']
})
export class ChildGraph2Component implements OnInit {
  // year vs avg val

  @Output() child2 = new EventEmitter<string>();
  show = false;

  constructor() { }

  ngOnInit(): void {
  }

  clicked() {
    this.show = true;
    this.child2.emit("1");
  }

}
