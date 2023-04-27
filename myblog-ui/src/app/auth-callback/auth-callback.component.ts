import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['token'];

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid login detected. Please re-login to continue.');
        this.router.navigate(['/login']);
      }
    });
  }
}
