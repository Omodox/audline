import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {

  private url = 'http://localhost:3000';
  private socket;

  sendMessage(message,id) {
    this.socket.emit('add-message', message, id);
    console.log("MESSAGE SENT");
  }
  getMessages(id) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(id, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    })
    return observable;
  }
  sendCommand(message,id) {
    this.socket.emit('player', message, id);
    // console.log(message);
  }
}