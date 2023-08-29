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
import { Router } from '@angular/router';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this.authService.logout();
        }
        else if(error.status === 412){
          this.showError(error.error.details, "RELOAD")
        }
        else{
          this.showError(error.error.error, "")
        }

        return throwError(error);

      })
    )
  }

  showError(errorMessage: string, action: string) {
    let snackBarRef = this.snackBar.open(errorMessage, action)

    if(action != ""){
      snackBarRef.onAction().subscribe(() => {
        window.location.reload()
      })
    }
    else{
      this.snackBar.open(errorMessage, "", {
        duration: 5000,
      });
      this.router.navigateByUrl("/error");
    }

  }
}
