import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required])
    });
  }


  submit() {
    if (this.loginForm.valid) {
      let username: string = this.loginForm.value.username;
      let password: string = this.loginForm.value.password;

      this.authService
        .login(username, password)
        .subscribe({
          next: () => {
            console.log("User is logged in")
            this.router.navigateByUrl('/');
          },
          error: (e) =>{
            console.log(e)
          }
        })

    }
  }

}
