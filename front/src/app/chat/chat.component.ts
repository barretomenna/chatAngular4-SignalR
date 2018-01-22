import { HubConnection } from '@aspnet/signalr-client';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private hub: HubConnection;
  message: string;
  messages = new Array<string>();

  constructor() { }

  ngOnInit() {

    this.hub = new HubConnection('http://192.168.15.6:5000/chat');

    this.hub
      .start()
      .then(() => alert('iniciou'))
      .catch(() => alert('erro ao iniciar'));

    this.hub.on('SendToAll', (message: string) => {
      this.messages.push(message);
    });

  }

  onPress(event: KeyboardEvent): void {
    if (event.keyCode === 10) {
      this.sendMessage();
    }
  }

  sendMessage(): void {
    this.hub
      .invoke('SendToAll', this.message)
      .catch(err => console.log(err));

    this.message = '';
  }
}

