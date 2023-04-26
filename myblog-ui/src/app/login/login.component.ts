import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  googleAuthUrl: string;

  constructor() {
    this.googleAuthUrl = environment.googleAuthUrl;
  }
}
