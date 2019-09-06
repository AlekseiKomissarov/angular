import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, map, tap} from 'rxjs/operators';


export interface Todo {
  completed: boolean
  title: string
  id?: number
}

@Injectable({
  providedIn: 'root'
  })
export class TodoService{
  constructor(private http: HttpClient){}

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({
      'MyHeader': Math.random().toString()

    })

    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers
    })
  }

  fetchTodo(): Observable<Todo[]> {

    let params = new HttpParams()
    params = params.append('_limit', '4')
    params = params.append('custom', 'anything')


    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      // params: new HttpParams().set('_limit', '10')
      params,
      observe: 'response'
    })
      .pipe(
        map(response => {
          console.log('Response', response)
          return response.body
        }),
        delay(1000),
        catchError(err => {
          return throwError(err)
        })
      )
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`,{
      observe: 'events'
    }).pipe(
      tap(event => {
        if (event.type === HttpEventType.Sent){
          console.log('Event sent:', event)
        }
        if (event.type === HttpEventType.Response){
          console.log('Event response:', event)
        }
      }) // перехватывает промежуточно данные
    )
  }

  completeTodo(id: number): Observable<Todo>{
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    }, {
      responseType: 'json'
    })
  }

}
