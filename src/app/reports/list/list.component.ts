import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  imports: [MatTableModule, CommonModule, MatButton],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  reports = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Dupont',
      birthDate: new Date(1990, 5, 15),
      gender: 'Female',
      email: 'alice.dupont@example.com',
      description: 'lorem upsum dolor sit amet.',
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Martin',
      birthDate: new Date(1985, 10, 25),
      gender: 'Male',
      email: 'bob.martin@example.com',
      description: 'lorem upsum dolor sit amet.',
    },
    {
      id: 3,
      firstName: 'Charlie',
      lastName: 'Durand',
      birthDate: new Date(1975, 3, 5),
      gender: 'Male',
      email: 'charlie.durand@example.com',
      description: 'lorem upsum dolor sit amet.',
    },
  ];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'email',
    'description',
    'actions',
  ];

  editReport(id: number) {
    console.log('edit report', id);
  }
}
