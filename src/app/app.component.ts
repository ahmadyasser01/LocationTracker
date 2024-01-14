import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './signalr.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  user = 'User';
  message = '';
  messages: string[] = [];

  constructor(private signalRService: SignalrService) {


  }

  ngOnInit() {
    if(this.signalRService !=null){

      this.signalRService = new SignalrService();
    }
    const requestId = '10'; // Set your requestId here
    // this.signalRService.subscribeToLocationUpdates(requestId);

    // Listen for real-time location updates.
    this.signalRService.onReceiveLocationUpdate(location => {
        // Handle the received location update.
        console.log('Received location update: ', location);
    });
    // this.signalRService.addMessageListener((user, message) => {
    //   console.log(`${user}: ${message}`);
    // });
  }

  
}
