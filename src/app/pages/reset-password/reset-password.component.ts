import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { RestPasswordRequest } from '../../services/models/reset-request';
import { ExtrasService } from '../../services/services/extras.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  email: string = '';
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service:ExtrasService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      return { passwordsDontMatch: true };
    }

    return null;
  }

  reset() {
    this.formSubmitted = true;
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.get('newPassword').value;
      this.resetForm.disable(); // Disable form to prevent multiple submissions
  
      const newCredential: RestPasswordRequest = {
        email: this.email,
        password: newPassword
      };
  
      this.service.resetPassword(newCredential).subscribe(
        (response: any) => { // Use any type since response is a string
          // Handle the response
          console.log(response.message); // Output the response directly
         
         
              this.router.navigate(['/login']);
           
        }
      );
    }
  }
  
}
