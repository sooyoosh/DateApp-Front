import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import  { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl=environment.hubsUrl;
  private hubConnection: HubConnection | null = null;
  onlineUsers=signal<string[]>([]); 
  constructor(private messageService:MessageService){
  }

  //start connrction
  startConnection() {
   const user=localStorage.getItem('user')
   const userOb=user? JSON.parse(user):null
   const token=userOb? userOb.token:null

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl+'presence', {
        accessTokenFactory: () => token || ''
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('Error connecting SignalR: ', err));

    
    this.hubConnection.on('UserIsOnline', (username) => {
      this.messageService.add({ key: 'toast1', severity: 'info', 
        summary: '', detail:username +' ' +'is Online' })
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.messageService.add({ key: 'toast1', severity: 'info', 
        summary: '', detail:username +' '+'is Offline' })
    });
    this.hubConnection.on('GetOnlineUser', (onlineUsers) => {
      this.onlineUsers.set(onlineUsers);
    });
  }



  //start connrction
 stopConnection() {
    if (this.hubConnection?.state===HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error=>console.log(error));
    }
  }



}
