import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../enums/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper: JwtHelperService;

  constructor() {
    this.helper = new JwtHelperService();
  }

  logoutUser(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !this.helper.isTokenExpired(token);
  }
}
