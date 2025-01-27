import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  reportForm: FormGroup;
  reportId: string = '';
  observations: Observation[] = [];
  errorMessage: string | null = null

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.reportForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      observations: [[]],  // Champ pour les observations
    });
  }

  ngOnInit(): void {
    this.reportId = this.route.snapshot.paramMap.get('id') || '';

    this.loadReportData();
  }

  /**
   * Charge les données du signalement à éditer avec les observations.
   */
  loadReportData(): void {
    this.apiService
      .getReportsWithObservations()
      .pipe(
        catchError((err) => {
          console.error('Erreur lors du chargement des signalements :', err);
          return of(null);
        })
      )
      .subscribe((reports) => {
        const report = reports?.find((r) => String(r.id) === this.reportId);

        if (report) {
          this.reportForm.patchValue({
            firstName: report.author?.first_name,
            lastName: report.author?.last_name,
            birthDate: new Date(report.author?.birth_date),
            gender: report.author?.gender,
            email: report.author?.email,
            description: report.description,
            observations: report.observations || [],

          });
          this.observations = report.observations || [];
        }
      });
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const formValue = this.reportForm.value;

      const updatedReport = {
        author: {
          first_name: formValue.firstName,
          last_name: formValue.lastName,
          birth_date: formValue.birthDate,
          gender: formValue.gender,
          email: formValue.email,
        },
        description: formValue.description,
        observations: this.observations,

      };

      this.apiService
        .updateReport(this.reportId, updatedReport)
        .pipe(
          catchError((err) => {
            console.error('Erreur lors de la mise à jour du signalement :', err);
            this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            console.log('Signalement mis à jour avec succès :', response);
            this.router.navigate(['/reports']);
          }
        });
    }
  }
}