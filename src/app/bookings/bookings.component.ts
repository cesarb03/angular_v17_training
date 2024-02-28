import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Activity } from '../domain/activity.type';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, FormsModule],
  template: `
    <div class="activity-details">
      <h2>{{ activity.name }}</h2>
      <p><strong>Location:</strong> {{ activity.location }}</p>
      <p><strong>Price:</strong> {{ activity.price | currency }}</p>
      <p><strong>Date:</strong> {{ activity.date | date: 'dd-MMM-yyyy' }}</p>
      <p><strong>Participants:</strong> {{ activity.minParticipants }} - {{ activity.maxParticipants }}</p>
      <p><strong>Status:</strong> {{ activity.status | uppercase }}</p>
      <p><strong>Duration:</strong> {{ activity.duration }} hours</p>
      <p><strong>Current participants:</strong> {{ currentParticipants }}</p>
      <input type="number" [(ngModel)]="newParticipants" />
      <p><strong>Total participants::</strong> {{ currentParticipants + newParticipants }}</p>
      <footer>
        <button class="primary" (click)="onBookingClick()">Book now</button>
      </footer>
    </div>
  `,
  styles: `
    .activity-details {
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      padding: 20px;
      margin-bottom: 20px;
      display: inline-block;
    }

    .activity-details h2 {
      color: blue;
    }

    .activity-details p {
      margin: 10px 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsComponent {
  activity: Activity = {
    name: 'Paddle surf',
    location: 'Lake Leman at Lausanne',
    price: 100,
    date: new Date(2025, 7, 15),
    minParticipants: 4,
    maxParticipants: 10,
    status: 'published',
    id: 1,
    slug: 'paddle-surf',
    duration: 2,
    userId: 1,
  };

  currentParticipants = 3;
  newParticipants = 1;

  onBookingClick() {
    console.log('Booking saved for participants: ', this.newParticipants);
  }
}