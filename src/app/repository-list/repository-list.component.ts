import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.css'
})
export class RepositoryListComponent {
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
  p: number = 1;
  
                
  
  @Input() repositories: any[] = [];
  @Input() userBio: any = [];
  @Input() pageSize=10

  
  @Output() pageChanged = new EventEmitter<number>();

  onPageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }
  
  
}
