import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface BankUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  companyName: string;
}

export interface ApiResponse {
  success: boolean;
  data: BankUser[];
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class BankDataService {
  private apiUrl = '/api/external-data';

  constructor(private http: HttpClient) { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * Fetches bank data from the Node.js backend
   * @returns Observable of BankUser array
   */
  getBankData(): Observable<BankUser[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching bank data:', error);
        return throwError(() => new Error('Failed to load bank data. Please try again later.'));
      })
    );
  }
}
