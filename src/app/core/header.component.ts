import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: ` <h1>Welcome to {{ title }}!</h1> `,
  styles: `
    h1 {
      color: #369;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = 'ActivityBookings';
}
