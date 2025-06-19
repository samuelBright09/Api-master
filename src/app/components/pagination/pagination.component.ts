import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
@Input() currentPage!: number
@Input() itemsPerPage!: number
@Input() totalItems!: number
@Output() pageChange = new EventEmitter<number>();

get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

changePage(newPage: number):void{
  if(newPage >= 1 && newPage <= this.totalPages){
    this.pageChange.emit(newPage);
  }
}



}
