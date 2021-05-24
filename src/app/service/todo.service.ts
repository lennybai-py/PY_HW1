import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoListBs = new BehaviorSubject<Todo[]>([]);
  todoList$ = this.todoListBs.asObservable();

  constructor() {
    const todolist = this.getTodoListFromLocalStorage();
    this.todoListBs.next(todolist);
  }

  setTodoList(newTodoList: Todo[]) {
    localStorage.setItem('todolist', JSON.stringify(newTodoList));
    this.todoListBs.next(newTodoList);
  }

  addTodoList(description: string) {
    const subscription = this.todoList$.subscribe((todoList) => {
      todoList.push({
        id: this.idGenerator(),
        description,
        status: 'active'
      });
    });
    subscription.unsubscribe();
  }

  getTodoListFromLocalStorage() {
    let todolist = localStorage.getItem('todolist') as any;
    todolist = (todolist && JSON.parse(todolist)) || [];
    return todolist;
  }

  private idGenerator() {
    return Math.random().toString(36).substr(2, 9);
  }

  // get todolist() {
  //   let favroites: any = localStorage.getItem('todolist')
  //   favroites = (favroites && JSON.parse(favroites)) || []
  //   return favroites;
  // }

  // set todolist(todolist: Todo[]) {
  //   const origin = this.todolist;
  //   // const result = [...origin, ...todolist.filter(n => !origin.some(o => o.id === n.id))];
  //   localStorage.setItem('todolist', JSON.stringify(origin));
  // }

  // setTodoList(newTodoList: Todo[]) {
  //   localStorage.setItem('todolist', JSON.stringify(newTodoList));
  // }
}

export interface Todo {
  id: string;
  description: string;
  status: string;
  readonly?: boolean;
}
