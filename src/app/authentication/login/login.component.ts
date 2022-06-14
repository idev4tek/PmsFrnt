import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  returnUrl: any;
  constructor(private fb: FormBuilder, private router: Router, private autService: AuthenticationService,
    private route: ActivatedRoute,) {
          if (this.autService.currentUserValue) { 
            this.router.navigate(['/']);
        } }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      return;
  }

  let t = this.autService.fakeLogin("null","null")
  if(t.access_token){
      this.router.navigate([this.returnUrl]);
  }else{
    console.log("login Error");
    
  }

    // this.autService.login(this.f.uname.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       console.log(error);
    //       // if(error&&error.error&&error.error_description)          
    //       //   this.msg =error.error.error_description;
    //       // else
    //       //   this.msg =JSON.stringify(error.error);
    //     });
    // this.router.navigate(['/dashboards/dashboard1']);
  }
}
