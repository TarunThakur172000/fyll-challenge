// cache.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  constructor() {}

  getData(key: string): any {
    return this.cache[key];
  }

  setData(key: string, data: any): void {
    this.cache[key] = data;
  }
}
