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

  public logoutUser(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public get getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    const token = this.getAccessToken;
    return !this.helper.isTokenExpired(token);
  }
}
