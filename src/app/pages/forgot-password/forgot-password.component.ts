import { Component, OnInit } from '@angular/core';
import { ExtrasService } from '../../services/services/extras.service'; // Assuming correct path
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import form controls
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotRequestForm: FormGroup;
  errorMsg: string[] = []; // Array to store error messages

  constructor(private extrasService: ExtrasService,
    private router : Router) { }

  ngOnInit() {
    this.forgotRequestForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]) // Email input validation
    });
  }

  verify() {
    if (this.forgotRequestForm.valid) {
      const email = this.forgotRequestForm.get('email').value;
  
      this.extrasService.verify(email).subscribe(
        (response) => {
          if (response === true) {
            console.log("Hello this is true");
            this.router.navigate(['reset-password'],{queryParams:{email:email}})
          } else {
            Swal.fire({
              icon: 'error', // Use 'error' icon for unsuccessful verification
              title: 'Email Not Found',
              text: 'The email address you entered is not registered yet. Would you like to register?',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Register Now',
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirect to login page using window.location.href or a router navigation approach
                window.location.href = "/registe"; // Replace with your actual login page URL
              }
            });
          }
        },
        (error) => {
          console.error('Error verifying email:', error);
          Swal.fire({
            icon: 'error',
            title: 'Verification Error',
            text: 'An error occurred while verifying your email. Please try again later.',
          });
        }
      );
    } else {
      console.error('Form validation failed.');
    }
  }
  
}
