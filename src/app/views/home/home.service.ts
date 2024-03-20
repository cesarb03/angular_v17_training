import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Activity } from '../../domain/activity.type'
import { Observable, catchError, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  #http = inject(HttpClient)
  #url = 'http://localhost:3000/activities'

  getActivities$(): Observable<Activity[]> {
    return this.#http.get<Activity[]>(this.#url).pipe(
      catchError((error) => {
        console.log(error)
        return of([])
      })
    )
  }
}
