import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-edit',
  imports: [
        CommonModule,
        ReactiveFormsModule, 
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {


  reportForm: FormGroup;
  reportId: number = 0;
  
  // Liste statique des signalements (peut être remplacée par une API)
  reports = [
    { id: 1, firstName: 'Alice', lastName: 'Dupont', birthDate: new Date(1990, 5, 15), gender: 'Femme', email: 'alice.dupont@example.com', description: 'Problème avec le voisinage.' },
    { id: 2, firstName: 'Bob', lastName: 'Martin', birthDate: new Date(1985, 10, 25), gender: 'Homme', email: 'bob.martin@example.com', description: 'Dommage sur propriété.' },
    { id: 3, firstName: 'Charlie', lastName: 'Durand', birthDate: new Date(1975, 3, 5), gender: 'Non-binaire', email: 'charlie.durand@example.com', description: 'Incident dans le quartier.' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reportForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.reportId = Number(this.route.snapshot.paramMap.get('id'));

    const report = this.reports.find(r => r.id === this.reportId);

    if (report) {
      this.reportForm.patchValue({
        firstName: report.firstName,
        lastName: report.lastName,
        birthDate: report.birthDate,
        gender: report.gender,
        email: report.email,
        description: report.description,
      });
    }
  }

  // Méthode pour soumettre le formulaire et modifier le signalement
  onSubmit(): void {
    if (this.reportForm.valid) {
      console.log('Signalement modifié :', this.reportForm.value);
      
      this.router.navigate(['/reports']);
    }
  }
}
