import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core'
import { Activity } from '../domain/activity.type'
import { RouterLink } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { toSignal } from '@angular/core/rxjs-interop'
import { catchError, of } from 'rxjs'

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <article>
      <header>
        <h2>Activities</h2>
      </header>
      <main>
        @for (activity of activities(); track activity.id) {
          <p>
            <span>
              <a [routerLink]="['/', 'bookings', activity.slug]"> {{ activity.name }}</a>
            </span>
            <span>at {{ activity.location }} </span>
          </p>
        }
      </main>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomePage {
  #title = inject(Title)
  #meta = inject(Meta)
  #http = inject(HttpClient)

  // Que hace toSignal()
  //1 - subscribe
  //2 - signal.set
  //3 - unSubscribe
  //4 - signal red-only no mutable

  activities: Signal<Activity[]> = toSignal(
    this.#http.get<Activity[]>('http://localhost:3000/activities').pipe(
      catchError((err) => {
        console.log(err)
        return of([])
      })
    ),
    { initialValue: [] }
  )

  constructor() {
    this.#title.setTitle('🏡 - Home')
    this.#meta.updateTag({ name: 'description', content: 'Home Page' })
  }
}
