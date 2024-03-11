import { ChangeDetectionStrategy, Component, Signal, computed, signal } from '@angular/core'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: ` <footer>
    <nav>
      <span>
        <a [href]="author.homePage" target="_blank">By {{ author.name }}.</a>
        <div>{{ year }}</div>
      </span>
      @if (cookiesAcceptted()) {
        <span>Cookies Acceptedd!</span>
      } @else {
        <button class="secondary outline" (click)="onAcceptCookies()">Accept cookies</button>
      }
      <div>
        <button [hidden]="cookiesAcceptted()" class="secondary outline" (click)="onAcceptCookies()">
          Accept cookies
        </button>
        <span [hidden]="cookiesPending()">Cookies Acceptedd!</span>
      </div>
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

  cookiesAcceptted = signal(false)

  cookiesPending: Signal<boolean> = computed(() => !this.cookiesAcceptted())

  year = new Date().getFullYear()

  onAcceptCookies() {
    console.log('Cookies accepted')
    // this.cookiesAcceptted.set(true)
    this.cookiesAcceptted.update((value: boolean) => !value)
  }
}
