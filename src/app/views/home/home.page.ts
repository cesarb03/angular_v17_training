import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import { Activity } from '../../domain/activity.type'
import { Meta, Title } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, of } from 'rxjs'
import { ActivityComponent } from './activity.component'
import { HomeService } from './home.service'

@Component({
  standalone: true,
  imports: [ActivityComponent],
  template: `
    <article>
      <header>
        <h2>Activities</h2>
      </header>
      <main>
        @for (a of activities(); track a.id) {
          <app-activity [activity]="a" [(favorites)]="favorites" />
        }
      </main>
      <footer>
        <small>
          Showing
          <mark>{{ activities().length }}</mark>
          activities, you have selected
          <mark>{{ favorites().length }}</mark>
          favorities.
        </small>
      </footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomePage {
  #title = inject(Title)
  #meta = inject(Meta)
  #http = inject(HttpClient)
  #homeService = inject(HomeService)

  // Que hace toSignal()
  //1 - subscribe
  //2 - signal.set
  //3 - unSubscribe
  //4 - signal red-only no mutable

  activities: Signal<Activity[]> = toSignal(this.#homeService.getActivities$(), {
    initialValue: []
  })

  favorites: WritableSignal<string[]> = signal<string[]>([])

  constructor() {
    this.#title.setTitle('🏡 - Home')
    this.#meta.updateTag({ name: 'description', content: 'Home Page' })
  }
}
