import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } else {
      errorMessage = 'An unknown error has occurred';
    }

    window.alert(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
