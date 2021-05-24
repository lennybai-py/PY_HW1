import { ApplicationRef, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { TodoService, Todo } from "./service/todo.service";
import { filter, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  todoList: Todo[] = [];
  displayList: Todo[] = [];
  filterBy: string;
  activeItemLength: number = 0;
  constructor(
    public todoService: TodoService,
  ) {

  }

  ngOnInit(): void {
    this.todoService.todoList$.pipe(tap((value) => {
      value.forEach(e => e.readonly = true);
      this.todoList = value;
      this.displayList = value;
      this.setActiveItemLength();
    })).subscribe();
    window.addEventListener('beforeunload', () => {
      this.todoService.setTodoList(this.todoList);
    });
  }

  onNewTodoKeydown(evt: KeyboardEvent) {
    const value = evt.target['value'];
    this.todoService.addTodoList(value);
    this.rerender();
    evt.target['value'] = '';
  }

  private rerender() {
    this.setActiveItemLength();
    this.onChangeStatus(this.filterBy);
  }

  onClickedToggleTodoItem(item: Todo) {
    item.status = item.status === 'active' ? 'completed' : 'active';
    this.rerender();
  }

  onTodoItemDoubleClicked(item: Todo) {
    if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
    }
    item.readonly = false;
  }

  onTodoItemBlur(item: Todo) {
    item.readonly = true;
  }

  onClickedDeleteTodoItem(item: Todo, index: number) {
    this.todoList.splice(index, 1);
    this.rerender();
  }

  onChangeStatus(status?) {
    this.filterBy = status;
    this.displayList = this.getTodoListByStatus(status);
  }

  onClickedClearCompleted() {
    const result = this.todoList.filter(e => e.status !== 'completed');
    this.todoService.setTodoList(result);
  }

  setActiveItemLength() {
    this.activeItemLength = this.todoList.filter(e => e.status === 'active').length;
  }

  // pageInfo = { start: 0, end: 0 };
  // onPageChanged(evt: { start: number, end: number }) {
  //   const { start, end } = evt;
  //   this.pageInfo = evt;
  //   this.displayList = this.getTodoListByStatus(this.filterBy).slice(start, end);
  // }

  getTodoListByStatus(status?: string) {
    status = status || this.filterBy;
    return this.todoList.filter(e => !status || e.status === status);
  }
}
