import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';
import { Observation } from '../models/observation.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reports`);
  }

  getReportById(id: string | number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/reports/${id}`);
  }

  createReport(report: Report): Observable<any> {
    return this.http.post(`${this.baseUrl}/reports`, {
      author: report.author,
      description: report.description,
      observations: report.observations, 
    });
  }

  updateReport(id: string | number, report: Report): Observable<any> {
  return this.http.put(`${this.baseUrl}/reports/${id}`, {
    author: report.author,
    description: report.description,
    observations: report.observations,
  });
}

 getReportsWithObservations(): Observable<Report[]> {
  return this.http.get<Report[]>(`${this.baseUrl}/reports`);
}
}


