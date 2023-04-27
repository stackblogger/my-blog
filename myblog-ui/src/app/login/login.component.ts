import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  googleAuthUrl: string;

  constructor() {
    this.googleAuthUrl = environment.apiBaseUrl + '/auth/google';
  }
}
