import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/auth';
    private tokenKey = 'bank_data_token';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    login(credentials: { username: string, password: string }): Observable<any> {
        return this.http.post<{ success: boolean, token: string, user: any }>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    if (response.success && response.token) {
                        localStorage.setItem(this.tokenKey, response.token);
                        this.isAuthenticatedSubject.next(true);
                        this.router.navigate(['/dashboard']);
                    }
                })
            );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}
