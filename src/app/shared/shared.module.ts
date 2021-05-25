import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';



@NgModule({
  declarations: [
    PaginatorComponent,
    ListComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginatorComponent,
    ListComponent,
    ListItemComponent
  ]
})
/** shared components */
export class SharedModule { }
