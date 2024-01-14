import { Injectable } from '@angular/core';
import  { HttpTransportType,HubConnection, HubConnectionBuilder,LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})

export class SignalrService {
  private hubConnection: HubConnection;

  constructor() { 
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:7099/LocationHub', {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }) // Replace with your SignalR hub URL
    .withAutomaticReconnect()
    // .configureLogging(LogLevel.Trace)
    .build();

  this.hubConnection
    .start()
    .then(() => {
      this.subscribeToLocationUpdates("10")
      console.log('Connection started')})
    .catch((err) => console.log('Error while starting connection: ' + err));
  }


  public addMessageListener(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  public subscribeToLocationUpdates(requestId: string) {
    // Subscribe to location updates for the specified requestId.
    this.hubConnection.invoke('SubscribeToLocationUpdates', requestId)
        .catch(err => console.error('Error while invoking SubscribeToLocationUpdates: ', err));
}

// Add a method to listen for real-time location updates from the server.
public onReceiveLocationUpdate(callback: (location: any) => void) {
    this.hubConnection.on('ReceiveLocationUpdate', callback);
}
}
