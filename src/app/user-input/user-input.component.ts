import { Component, EventEmitter, Output } from '@angular/core';
import { GithubApiService  } from '../github-api.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
    
  username = '';
  pageSize = 10;
  repositories: any[] = [];
  userBio: any = {};
  totalItems = 0;
  currentPage = 1;
  loader=false


  constructor(private githubService: GithubApiService) {}

  @Output() repositoriesChanged = new EventEmitter<any[]>();
  @Output() pageSizeChanged = new EventEmitter<number>();
   
  getRepositories(page: number): void {
    if (this.username.trim()) {
      this.loader=true
      this.githubService.getUserRepositories(this.username,page,this.pageSize)
        .subscribe(
          repositories => 
            {
              
              this.repositories = repositories
              this.repositoriesChanged.emit(this.repositories);
              
                this,this.loader=false
              
            },
          error => console.log(error)
        );

        this.githubService.getUserbio(this.username)
        .subscribe(
          userBio => {
            // Store the user's bio information in the repo array
            this.userBio=userBio;  
            
          },
          error => console.log(error)
        );


    }
  }

  updatePageSize(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.pageSizeChanged.emit(this.pageSize);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
      this.getRepositories(pageNumber);
    }

  
 
}
