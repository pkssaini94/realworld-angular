import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Errors } from '../core/models/errors.model';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  authType: string = '';
  title: string = '';
  isSubmitting: boolean = false;
  errors: Errors = new Errors();


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) {

    // Use FormBuilder to create a login form
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }


  onSubmit() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;

    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err.error;
          this.isSubmitting = false;
        }
      );
  }


}
