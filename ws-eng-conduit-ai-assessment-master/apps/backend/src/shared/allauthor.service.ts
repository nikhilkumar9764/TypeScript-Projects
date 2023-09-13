import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<string[]> {
    // Make an HTTP GET request to fetch all authors from your API
    return this.http.get<string[]>('/api/profiles/get_all_authors');
  }
}