import {Component, ViewEncapsulation} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class AppComponent {
  quantity = 0;

  constructor() {
    const socket = io('http://localhost:3000');
    socket.on('data', (data) => {
      this.quantity = Math.round(data / 10);
    });
  }
}
