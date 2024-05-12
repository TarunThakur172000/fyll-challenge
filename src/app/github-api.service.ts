import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient,private cacheService: CacheService) {}

  getUserRepositories(username: string, page: number, pageSize: number): Observable<any[]> {
    const cacheKey = `repos_${username}_${page}_${pageSize}`;
    const cachedData = this.cacheService.getData(cacheKey);
    console.log(cacheKey)
    if (cachedData) {
      return new Observable<any[]>(observer => {
        observer.next(cachedData);
        observer.complete();
      });
    }else{
    const url = `${this.baseUrl}/users/${username}/repos?page=${page}&per_page=${pageSize}`;
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}

  getUserbio(username: string): Observable<any> {
    const url = `${this.baseUrl}/users/${username}`;
    return this.http.get<any>(url);
  }
  
}

