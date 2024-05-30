import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TokenService } from '../token/token.service';
import { SpinnerService } from '../../pages/spinner/spinner.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private spinnerService: SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token;
    
    this.spinnerService.requestStarted();

    let authReq = request;
    if (token) {
      authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      });
    }

    return next.handle(authReq).pipe(
      finalize(() => {
        this.spinnerService.requestEnded();
        this.spinnerService.resetSpinner();
      })
    );
  }
}
