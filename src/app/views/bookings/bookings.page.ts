import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  input,
  signal
} from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { Activity, NULL_ACTIVITY } from '../../domain/activity.type'
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Meta, Title } from '@angular/platform-browser'
import { Booking, NULL_BOOKING } from '../../domain/booking.type'
import { Observable, switchMap } from 'rxjs'
import { BookingConfirmComponent } from './booking-confirm.component'
import { BookingsService } from './bookings.service'

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    BookingConfirmComponent,
    CommonModule,
    CurrencyPipe,
    DatePipe,
    UpperCasePipe,
    FormsModule
  ],
  template: `
    <div class="activity-details">
      @if (activity(); as activity) {
        <h2>{{ activity.name }}</h2>
        <p><strong>Location:</strong> {{ activity.location }}</p>
        <p><strong>Price:</strong> {{ activity.price | number: '1.2-2' }} €</p>
        <p><strong>Date:</strong> {{ activity.date | date: 'dd-MMM-yyyy' }}</p>
        <p>
          <strong>Participants:</strong> {{ activity.minParticipants }} -
          {{ activity.maxParticipants }}
        </p>
        <p><strong>Status:</strong> {{ activity.status | uppercase }}</p>
        <p><strong>Duration:</strong> {{ activity.duration }} hours</p>
      }
      <p><strong>Current participants:</strong> {{ currentParticipants() }}</p>
      <form>
        <label for="newParticipants"><strong>New Participants:</strong></label>
        <input
          name="newParticipants"
          type="number"
          min="0"
          [max]="maxNewParticipant()"
          [(ngModel)]="newParticipants"
          (ngModelChange)="onNewParticipantsChange($event)"
        />
      </form>
      <p><strong>Total participants:</strong> {{ totalParticipants() }}</p>
      <div>
        @for (participant of participants(); track participant.id) {
          <span>🏃‍♂️ {{ participant.id }}</span>
        } @empty {
          <span>🛞</span>
        }
      </div>
      <footer>
        <app-booking-confirm
          [canBook]="canBook()"
          (saveBooking)="onSaveBooking()"
        ></app-booking-confirm>
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
      overflow-y: auto;
      max-width: 20%;
    }

    .activity-details h2 {
      color: blue;
    }

    .activity-details p {
      margin: 10px 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BookingsPage {
  #title = inject(Title)
  #meta = inject(Meta)
  #homeService = inject(BookingsService)

  currentParticipants: WritableSignal<number> = signal(3)
  participants: WritableSignal<{ id: number }[]> = signal([{ id: 1 }, { id: 2 }, { id: 3 }])
  newParticipants: WritableSignal<number> = signal(0)
  totalParticipants: Signal<number> = computed(
    () => this.currentParticipants() + this.newParticipants()
  )

  maxNewParticipant = computed(() => this.activity().maxParticipants - this.currentParticipants())
  isSoldOut = computed(() => this.totalParticipants() >= this.activity().maxParticipants)
  canBook = computed(() => this.newParticipants() > 0)

  slug: InputSignal<string> = input.required<string>()
  #slug$: Observable<string> = toObservable(this.slug)

  #activity$: Observable<Activity> = this.#slug$.pipe(
    switchMap((slug: string) => this.#homeService.getActivityBySlug$(slug))
  )

  activity: Signal<Activity> = toSignal(this.#activity$, { initialValue: NULL_ACTIVITY })

  constructor() {
    // Update meta and title
    effect(() => {
      const activity = this.activity()
      this.#title.setTitle(activity.name)
      const description = `${activity.name} in ${activity.location} on ${activity.date} for ${activity.price}`
      this.#meta.updateTag({ name: 'description', content: description })
    })
    effect(() => {
      if (this.isSoldOut()) {
        console.log('Se ha vendido todo')
      } else {
        console.log('Hay entradas disponibles')
      }
    })
  }

  onNewParticipantsChange(newParticipants: number) {
    this.newParticipants.set(newParticipants)
    const startingId = this.currentParticipants() + 1
    this.participants.update((participants) => {
      participants = participants.slice(0, this.currentParticipants())
      for (let i = 0; i < newParticipants; i++) {
        participants.push({ id: startingId + i })
      }
      return participants
    })
  }

  onSaveBooking() {
    const newBookings: Booking = NULL_BOOKING
    newBookings.activityId = this.activity().id
    newBookings.participants = this.newParticipants()
    if (newBookings.payment) {
      newBookings.payment.amount = this.activity().price * this.newParticipants()
    }
    this.#homeService.postBooking$(newBookings).subscribe({
      next: () => {
        this.putActivityStatus()
      },
      error: (err) => {
        console.log('err', err)
      }
    })
    console.log('Booking saved for participants: ', this.newParticipants())
  }

  putActivityStatus() {
    const updatedActivity = this.activity()
    updatedActivity.status = 'confirmed'
    this.#homeService.putActivityStatus$(updatedActivity).subscribe({
      next: () => {
        this.currentParticipants.set(this.totalParticipants())
        this.newParticipants.set(0)
      }
    })
  }
}
