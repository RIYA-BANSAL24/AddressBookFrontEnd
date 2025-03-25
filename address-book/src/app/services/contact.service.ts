// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:8080/api/contacts'; // Spring Boot API

  constructor(private http: HttpClient) {}

  // Get all contacts
  getContacts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get contact by ID
  getContactById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create contact
  createContact(contact: any): Observable<any> {
    return this.http.post(this.baseUrl, contact);
  }

  // Update contact
  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, contact);
  }

  // Delete contact
  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
