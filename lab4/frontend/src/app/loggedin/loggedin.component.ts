import { Component, OnInit, Input } from '@angular/core';
import { JsonObjectExpression } from 'typescript';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  @Input() name: String = "";
  @Input() product: String = "";
  @Input() recent: JSON | null = null;
  gotSongs: boolean = false;

  constructor( private httpService: HttpService) {}

  refresh_token: string = "";
  ngOnInit(): void {
    let access_token: string = searchParams.get("access_token")!;
    this.refresh_token = searchParams.get("refresh_token")!;
    this.getInfo(access_token);
    this.getRecent(access_token);

  }

  getInfo(token: string) {
    this.httpService.testGet(`http://localhost:3000/info?token=${token}`).subscribe((data) => {
      console.log(data)
      let one = JSON.stringify(data) as string;
      let two = JSON.parse(one);
      this.name = two["display_name"];
      this.product = two["product"];
    });
  }

  getRecent(token: string) {
    this.httpService.testGet(`http://localhost:3000/recent?token=${token}`).subscribe((data) => {
      this.populate_recently_played(data);
      this.gotSongs = true;
    });
  }

  populate_recently_played(zero: any) {
    let one = JSON.stringify(zero) as string;
    let data = JSON.parse(one);
    let tracks = data["items"]
    let out = "<ul id='recent' class='list_'>";
    tracks.forEach((element: any) => {
        out += '<li class="list_item">';
          out += "<div class='card-horizontal'>";
            out += `<div class="img-square-wrapper"> <img class="thumbnail" width="200px" src="${element["track"]["album"]["images"]["1"]["url"]}" alt="album art"></div>`;
              out += '<div class="card-body">';
                out += `<h4 class="card-title song">Song name: ${element["track"]["name"]}</h4>`;
                out += '<span class="not-liked" onclick="addLike(this)">&nbsp;</span>'

                out += `<span class="artists card-text">Artist(s): `;
                element["track"]["artists"].forEach((artist: any) => {
                    out += `<a href="https://open.spotify.com/artist/5WmX340gDNLIAyUcg4MzWN${artist["id"]}">${artist["name"]} </a>`;
                })

                out += `</span><p class="album card-text">Album: ${element["track"]["album"]["name"]}</p>`
                out += `<span class="addToPlaylist" onclick="alert('added to playlist')">Add to a playlist</span>` // POST here

                out += `<p class="card-footer">Played ${this.parse(element["played_at"])} ago</p>`;
            out += `</div>`;
          out += "</div>";
        out += '</li>';
    })
    out += "</ul>";
    let recently_played = document.getElementById("recently-played") as HTMLDivElement;
    recently_played.innerHTML = out;
  }

  parse(date: string) {
    let timestamp = Date.parse(date);
    let diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) {
        return `${diff} seconds`;
    } else if (diff < 3600) {
        return `${Math.floor(diff/60)} minute${Math.floor(diff/60)===1?"":"s"}`;
    } else if (diff < 86400) {
        return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)===1?"":"s"}`;
    } else {
        return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)===1?"":"s"}`;
    }

}

  getCall(url: string) {
    this.httpService.testGet(`http://localhost:3000/${url}`).subscribe((data) => {
      console.log(data);
      return data;
    })
  }

}

let searchParams = new URLSearchParams(window.location.search)
