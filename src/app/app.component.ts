import {Component} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status;
  constructor() {
    const socket = io('http://localhost:3000');
    socket.on('data', (data) => {
      this.status = data;
    });
  }
}
