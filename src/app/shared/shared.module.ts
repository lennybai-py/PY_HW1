import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListComponent } from './components/list/list.component';
import { InputComponent } from './components/input/input.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';



@NgModule({
  declarations: [
    // PaginatorComponent,
    ListComponent,
    InputComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // PaginatorComponent,
    ListComponent,
    InputComponent,
    ListItemComponent
  ]
})
/** shared components */
export class SharedModule { }
