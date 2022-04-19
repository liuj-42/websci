import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @Input() title = "undefined";
  @Input() type = "0";

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin = 50;
  private width = 1500 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private httpService: HttpService ) { }

  ngOnInit(): void {
    if (this.type == "1") {
      this.httpService.getData3().subscribe(data => {
        this.data = JSON.parse(JSON.stringify(data))[0]["data"]
        this.createSvg();
        this.drawBars(this.data);
      })
    } else {
      this.httpService.getData1().subscribe(data => {
        this.data = JSON.parse(JSON.stringify(data))[0]["data"]

        this.createSvg();
        this.drawBars(this.data);
      })
    }
 


  }

  private createSvg(): void {
      this.svg = d3.select("figure#bar")
      .append("svg")
      .style("overflow","visible")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
      // Create the X-axis band scale
      let x: any;
      if (this.type == "1") {
        x = d3.scaleBand()
        .range([0, this.width])
        .domain(data.map(d => d.Artist))
        .padding(0.2);
      } else {
        x = d3.scaleBand()
        .range([0, this.width])
        .domain(data.map(d => d.title))
        .padding(0.2);
      }


      // Draw the X-axis on the DOM
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

      let y: any;
      if (this.type == "1") {
        y = d3.scaleLinear()
        .domain([0, 4000000])
        .range([this.height, 0]);
      } else {
        y = d3.scaleLinear()
        .domain([0, 100])
        .range([this.height, 0]);
      }
      // Create the Y-axis band scale
      

      // Draw the Y-axis on the DOM
      this.svg.append("g")
      .call(d3.axisLeft(y));


      // Create and fill the bars
      if (this.type=="1") {
        this.svg.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d: any) => x(d.Artist))
        .attr("y", (d: any) => y(d.Followers))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => this.height - y(d.Followers))
        .attr("fill", "#d04a35");
        
        this.svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", this.width)
        .attr("y", this.height - 6)
        .text("Artist");
  
        this.svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Followers");
      } else {

        this.svg.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d: any) => x(d.title))
        .attr("y", (d: any) => y(d.val))
        .attr("width", x.bandwidth())
        .attr("height", (d: any) => this.height - y(d.val))
        .attr("fill", "#d04a35");
        
        this.svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", this.width)
        .attr("y", this.height - 6)
        .text("Song name");
  
        this.svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Mood (1 unhappy 100 happy)");
      }

  }
}
