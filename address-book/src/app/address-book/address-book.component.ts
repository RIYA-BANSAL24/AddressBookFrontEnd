import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBookService } from '../services/address-book.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  persons: any[] = [];
  errorMessage: string = '';

  constructor(private router: Router, private addressBookService: AddressBookService) {}

  ngOnInit() {
    this.getAllPersons();
  }

  getAllPersons() {
    this.addressBookService.getContacts().subscribe(
      (data) => {
        console.log('Retrieved persons from backend:', data);
        this.persons = data;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error fetching persons:', error);
        this.errorMessage = 'Failed to load contacts. Please try again later.';
      }
    );
  }

  navigateToAddPerson() {
    this.router.navigate(['/add-person']);
  }

  deletePerson(id: number) {
    console.log('Deleting person with ID:', id);
    this.addressBookService.deleteContact(id).subscribe(
      (response) => {
        console.log('Person deleted:', response);
        this.getAllPersons();
      },
      (error) => {
        console.error('Error deleting person:', error);
        this.errorMessage = 'Failed to delete the contact. Please try again.';
      }
    );
  }

  editPerson(person: any, index: number) {
    localStorage.setItem('editPersonIndex', JSON.stringify(index));
    localStorage.setItem('editPerson', JSON.stringify(person));
    this.navigateToAddPerson();
  }
}
