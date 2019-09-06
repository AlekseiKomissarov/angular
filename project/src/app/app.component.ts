import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Todo, TodoService} from './todo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []
  todoTittle = ''
  loading = false
  error = ''

  constructor(private todoService: TodoService){}

  ngOnInit() {
    this.fetchTodo()
  }

  addTodo() {
    if (!this.todoTittle.trim()) {
      return
    }
    this.todoService.addTodo({
      title: this.todoTittle,
      completed: false
    }).subscribe(todo => {
      this.todos.push(todo)
      this.todoTittle = ''
    })
  }

  fetchTodo() {
    this.loading = true
    this.todoService.fetchTodo()
      .subscribe(response => {
        this.todos = response
        this.loading = false
      }, error =>{
        console.log('Error:', error.message)
        this.error = error.message
      })
  }

  removeTodo(id: number) {
    this.loading = true
    this.todoService.removeTodo(id)
      .subscribe(()=>{
        this.todos = this.todos.filter(t => t.id !== id)
        this.loading = false
      })

  }

  completeTodo(id: number) {
    this.todoService.completeTodo(id)
      .subscribe(todo =>{
        this.todos.find(t => t.id === todo.id).completed = true
      })
  }
}

