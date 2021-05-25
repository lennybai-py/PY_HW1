import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageIndex: number = 0;
  @Output() page = new EventEmitter();
  totalpages: number = 0;
  pageIndexArray = [];

  @ViewChild('indexWrap') indexWrap: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.calc();
    this.changePage();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.calc();    
  }

  onOptionChanges(evt: Event) {
    this.pageSize = parseInt(evt.target['value']);
    this.calc();
    this.changePage();
  }

  private changePage() {
    const start = this.pageSize * this.pageIndex;
    const end = start + this.pageSize;
    this.page.emit({ start, end, pageSize: this.pageSize, pageIndex: this.pageIndex });
  }

  calc() {
    this.totalpages = Math.ceil(this.length / this.pageSize);
    let i = this.totalpages;
    this.pageIndexArray = [];
    while (i > 0) {
      this.pageIndexArray.unshift(--i);
    }
  }

  onClickedPageIndex(idx) {
    this.pageIndex = idx;
    this.changePage();
  }

  onIndexWrapWheel(evt: Event) {
    if (evt['deltaY'] > 0) {
      this.indexWrap.nativeElement.scrollLeft += 64;
    } else {
      this.indexWrap.nativeElement.scrollLeft -= 64;
    };

  }

}
