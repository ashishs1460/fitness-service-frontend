import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPasswordRequest } from '../models/forgot-password-request';
import { RestPasswordRequest } from '../models/reset-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {
 
 
    url:string = 'https://fitness-social-service.vercel.app/api/v1'

  constructor(
    private http : HttpClient
  ) { }

  verify(forgotRequest: ForgotPasswordRequest) {
 
    console.log(forgotRequest);
    
    
    const fullUrl = `${this.url}/auth/verify?email=${forgotRequest}`;
    return this.http.get<boolean>(fullUrl);
  }
  resetPassword(newCredential: RestPasswordRequest):Observable<any> {
    return this.http.post<any>(`${this.url}/auth/resetPassword`,newCredential);
  }


}
