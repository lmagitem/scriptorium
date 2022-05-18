import { isDevMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

/** Generic API service to be extended by entity services. */
export abstract class ApiService<T> {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private baseUri = isDevMode() ? 'http://localhost:8080/' : '';
  protected abstract entityName: string;

  constructor(protected http: HttpClient) {}

  /** Returns all entities from database. */
  public findAll(): Observable<Array<T>> {
    return this.http.get(`${this.baseUri}api/${this.entityName}`).pipe(
      map((o) => o as Array<T>),
      catchError(this.handleError)
    );
  }

  /** Returns one entity using its id from database. */
  public find(id: any): Observable<T | null> {
    return this.http
      .get(`${this.baseUri}api/${this.entityName}/${id}`, {
        headers: this.headers,
      })
      .pipe(
        map((o) => (o as T) || null),
        catchError(this.handleError)
      );
  }

  /** Adds a new entity to database. */
  public add(data: T): Observable<T> {
    return this.http.post(`${this.baseUri}api/${this.entityName}`, data).pipe(
      map((o) => o as T),
      catchError(this.handleError)
    );
  }

  /** Updates an entity in database. */
  public update(id: any, data: T): Observable<T | null> {
    return this.http
      .put(`${this.baseUri}api/${this.entityName}/${id}`, data, {
        headers: this.headers,
      })
      .pipe(
        map((o) => (o as T) || null),
        catchError(this.handleError)
      );
  }

  /** Deletes and entity in database. */
  public delete(id: any): Observable<boolean> {
    let url = `${this.baseUri}api/${this.entityName}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      map((o) => o as boolean),
      catchError((e) => this.handleError(e))
    );
  }

  /** Formats an error for proper console display. */
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    // Client-side error
    if (error.error instanceof ErrorEvent) errorMessage = error.error.message;
    // Server-side error
    else errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
    console.error(errorMessage, error);
    return throwError(error);
  }
}
