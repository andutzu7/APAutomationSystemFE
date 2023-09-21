import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private location: Location) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.details) {
            this.showError(error.error.details, "RETRY")
          }
          else{
            this.authService.logout();
          }
        }
        else if (error.status === 412) {
          this.showError(error.error.details, "RELOAD")
        }
        else {
          if (error.error.details) {
            this.showError(error.error.details, "CLOSE")
          }
          else {
            if (error.error.error){
              this.showError(error.error.error, "CLOSE")
            }
            else{
              this.showError("Unknown error", "OK")
            }
            
          }
        }

        return throwError(error);

      })
    )
  }

  showError(errorMessage: string, action: string) {
    let snackBarRef = this.snackBar.open(errorMessage, action)

    if (action == "RELOAD" || action == "RETRY" || action == "OK") {
      snackBarRef.onAction().subscribe(() => {
        window.location.reload()
      })
    }
    else{
      snackBarRef.onAction().subscribe(() => {
        this.location.back()
      })
    }

  }
}
