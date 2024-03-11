import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: ` <header>
    <nav>
      <h1 [routerLink]="['/']">
        <strong>{{ title }}</strong>
      </h1>
      <a [routerLink]="['/', 'auth', 'login']">Login</a>
      <a [routerLink]="['/', 'auth', 'register']">Register</a>
    </nav>
  </header>`,
  styles: `
    h1 {
      color: #369;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  title = 'ActivityBookings'
}
