import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz';
  shown = 0;
  child1Shown = false;
  child2Shown = false;

  child1Event(data:string) {
    console.log(data)
    if (!this.child1Shown) {
      this.shown += 1;
      this.child1Shown = true;
    }
  }

  child2Event(data:string) {
    if (!this.child2Shown){
      this.shown += 1;
      this.child2Shown = true;
    }

  }
}
