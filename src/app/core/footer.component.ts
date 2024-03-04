import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: ` <footer>
    <nav>
      <span>
        <a [href]="author.homePage" target="_blank">By {{ author.name }}.</a>
        <div>{{ getYear() }}</div>
      </span>
      <button class="secondary outline" (click)="onAcceptCookies()">Accept cookies</button>
    </nav>
  </footer>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  author = {
    name: 'Softtek',
    homePage: 'https://www.softtek.com/es-es/'
  }

  getYear() {
    return new Date().getFullYear()
  }

  onAcceptCookies() {
    console.log('Cookies accepted')
  }
}
