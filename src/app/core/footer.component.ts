import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: ` <footer>
    <a [href]="author.homePage" target="_blank">By {{ author.name }}.</a>
    <div>{{ getYear() }}</div>
    <button (click)="onAccepCookies()">Accept cookies</button>
  </footer>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  author = {
    name: 'Softtek',
    homePage: 'https://www.softtek.com/es-es/',
  };

  getYear() {
    return new Date().getFullYear();
  }

  onAccepCookies() {
    console.log('Cookies accepted');
  }
}
