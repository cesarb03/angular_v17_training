import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  standalone: true,
  imports: [],
  template: ` <h2>login works!</h2> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {}
