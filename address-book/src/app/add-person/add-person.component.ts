import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  fullname: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  editIndex: number | null = null; // To track the index of the person being edited

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if editing data exists in localStorage
    const editPerson = localStorage.getItem('editPerson');
    if (editPerson) {
      const person = JSON.parse(editPerson);

      // Pre-fill form fields with existing data for editing
      this.fullname = person.fullname;
      this.phoneNumber = person.phoneNumber;
      this.address = person.address;
      this.city = person.city;
      this.state = person.state;
      this.zipCode = person.zipCode;

      // Get the index of the person being edited
      this.editIndex = JSON.parse(localStorage.getItem('editPersonIndex') || 'null');
    }
  }

  addPerson() {
    const newPerson = {
      fullname: this.fullname,
      phoneNumber: this.phoneNumber,
      address: this.address,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
    };

    let persons = JSON.parse(localStorage.getItem('persons') || '[]');

    if (this.editIndex !== null) {
      // Update the person at the specified index
      persons[this.editIndex] = newPerson;
    } else {
      // Add a new person to the list
      persons.push(newPerson);
    }

    // Save updated data to localStorage
    localStorage.setItem('persons', JSON.stringify(persons));

    // Clear edit data from localStorage
    localStorage.removeItem('editPerson');
    localStorage.removeItem('editPersonIndex');

    // Navigate back to the main page
    this.router.navigate(['/']);
  }

  resetForm() {
    this.fullname = '';
    this.phoneNumber = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.zipCode = '';
  }
}
