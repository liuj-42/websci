import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildGraph1Component } from './child-graph1/child-graph1.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildGraph2Component } from './child-graph2/child-graph2.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildGraph1Component,
    ChildGraph2Component,
    BarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
