import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private baseUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createContact(contact: any): Observable<any> {
    return this.http.post(this.baseUrl, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
