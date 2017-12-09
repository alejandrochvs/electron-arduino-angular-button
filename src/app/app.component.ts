import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  string = '';

  constructor() {
    const socket = io('http://localhost:3000');
    socket.on('data', (data) => {
      this.append(data);
    });
  }

  ngOnInit() {
    const classes = document.getElementsByClassName('key');
    Array.from(classes).forEach((element) => {
      element.addEventListener('click', (event) => {
        this.append(event.srcElement.innerHTML);

      });
    });
  }

  append(key) {
    if (isNaN(key) || key === null) {
      return this.string = this.string.slice(0, -1);
    }
    this.string += key;
  }
}
