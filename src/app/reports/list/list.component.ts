import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  reports: Report[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'email',
    'observations',
    'description',
    'actions',
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.apiService.getReports().subscribe({
      next: (data) => (this.reports = data),
      error: (err) => console.error('Erreur lors du chargement des signalements :', err),
    });
  }

  editReport(id: string): void {
    this.router.navigate(['/reports/edit', id]);
  }

  hasNoObservations(observations: any[]): boolean {
    return !observations || observations.length === 0 || observations.every(obs => obs === null);
  }
}
