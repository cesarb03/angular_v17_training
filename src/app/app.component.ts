import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './core/footer.component'
import { HeaderComponent } from './core/header.component'
import { BookingsComponent } from './bookings/bookings.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, BookingsComponent],
  template: `
    <app-header />
    <app-bookings />
    <router-outlet />
    <app-footer />
  `,
  styles: []
})
export class AppComponent {}
