import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Base API URL - replace with your actual API endpoint
  private apiUrl = 'https://api.example.com/v1';

  constructor(private http: HttpClient) { }

  // Default HTTP options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Generic GET request
   * @param endpoint API endpoint
   * @param options Optional HTTP options
   */
  get<T>(endpoint: string, options = this.httpOptions): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, options)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /**
   * Generic POST request
   * @param endpoint API endpoint
   * @param data Request payload
   * @param options Optional HTTP options
   */
  post<T>(endpoint: string, data: any, options = this.httpOptions): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Generic PUT request
   * @param endpoint API endpoint
   * @param data Request payload
   * @param options Optional HTTP options
   */
  put<T>(endpoint: string, data: any, options = this.httpOptions): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Generic DELETE request
   * @param endpoint API endpoint
   * @param options Optional HTTP options
   */
  delete<T>(endpoint: string, options = this.httpOptions): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Error handler for HTTP requests
   */
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
