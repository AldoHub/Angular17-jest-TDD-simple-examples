import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from "../shared/types/tag"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  httpClient = inject(HttpClient);
  apiUrl: string = 'http://localhost:3004';
  
  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`${this.apiUrl}/tags`);
  }

 createTag(name: string): Observable<Tag> {
  return this.httpClient.post<Tag>(`${this.apiUrl}/tags`, { name });
 }

}
