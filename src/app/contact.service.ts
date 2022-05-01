import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

const baseUrl = "http://localhost:8080/contact"

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) {

  }

  getAll(skipCount: number, limitCount: number): Observable<any> {
    return this.http.get(baseUrl + "/list/" + skipCount + "/" + limitCount)
  }

  search(skipCount: number, limitCount: number, searchKeyword: string): Observable<any> {
    return this.http.get(baseUrl + "/search/" + limitCount + "/" + searchKeyword)
  }
}
