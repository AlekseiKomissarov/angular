import {Component} from '@angular/core';
import {Observable} from 'rxjs';

export interface Post {
  title: string,
  text: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent{
  // isVisible = true
  // title = 'project'

  // e: number = Math.E
  // str = 'hello world!'

  search = ''
  searchField = 'title'

  p: Promise<string> = new Promise<string>(resolve => {
    setTimeout(()=>{
      resolve('Promise resolve')
    }, 4000)
  })

  date: Observable<Date> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date())
    }, 1000)
  })



  posts: Post[] = [
    {title: 'Beer', text: 'the best beer in the world!'},
    {title: 'Bread', text: 'the best bread in the world!'},
    {title: 'Language', text: 'the best language in the world!'}
  ]

  addPost(){
    this.posts.unshift({
      title: 'Angular 8',
      text: 'new post about angular'
    })
  }

}
