import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Observation } from '../../models/observation.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  reportForm: FormGroup;
  observations: Observation[] = [];
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.reportForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthDate: ['', [Validators.required, this.ageValidator]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      observations: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadObservations();
  }

  loadObservations(): void {
    this.apiService.getReportsWithObservations().subscribe({
      next: (data) => {
        this.observations = data.map((report) => report.observations).flat();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des observations:', err);
      },
    });
  }

  ageValidator(control: any) {
    const today = new Date();
    const birthDate = new Date(control.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age <= 100 ? null : { ageInvalid: true };
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const formValue = this.reportForm.value;
  
      const newReport = {
        author: {
          first_name: formValue.firstName,
          last_name: formValue.lastName,
          birth_date: formValue.birthDate,
          gender: formValue.gender,
          email: formValue.email,
        },
        description: formValue.description,
        observations: formValue.observations.map((obsId: number) => ({
          id: obsId,  // L'API attend un tableau d'IDs d'observations
        })),
      };
  
      this.apiService.createReport(newReport).subscribe({
        next: () => {
          console.log('Nouveau signalement créé avec succès');
          this.router.navigate(['/reports']);
        },
        error: (err) => {
          if (err.status === 400 && err.error?.author?.email) {
            this.errorMessage = "L'email existe déjà.";
          } else {
            console.error('Erreur lors de la création du signalement :', err);
          }
        },
      });
    }
  }
  
}
