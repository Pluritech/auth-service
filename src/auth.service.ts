import { Injectable } from '@angular/core';

import { Token } from './auth.token';
import { AuthStatus } from './auth.status';

/**
 * A service to store and control the token of authenticated user on pluritech applications
 */
@Injectable()
export class AuthService {

  private static AUTH_TOKEN = 'AUTH_TOKEN_KEY';
  private token: Token;

  constructor() {
  }

/**
 * Check if the current token is not expired
 * @returns a boolean representing the status of not expired token
 */
  private checkIsLogged(): boolean {
    if (!this.token) {
      return false;
    }
    const now = new Date();
    return this.token.expires > now.getTime();
  }

/**
 * Check the status of the current token
 * @param token     the status of the current token
 */
  public isLogged(): Promise<AuthStatus> {
    if (this.checkIsLogged()) {
      return Promise.resolve(AuthStatus.AUTHENTICATED);
    }
    const stringifiedToken = window.localStorage.getItem(AuthService.AUTH_TOKEN);

    return Promise.resolve(stringifiedToken).then(() => {
      if (stringifiedToken) {
        const token: Token = JSON.parse(stringifiedToken);
        if (!token || !token.expires) {
          return AuthStatus.UNAUTHENTICATED;
        } else {
          this.token = token;
          if (this.checkIsLogged()) {
            return AuthStatus.EXPIRED;
          } else {
            return AuthStatus.AUTHENTICATED;
          }
        }
      } else {
        return AuthStatus.UNAUTHENTICATED;
      }
    });
  }

/**
 * Put the current authenticated token on DB and service
 * @param token     the current token to be saved on DB
 */
  public login(token: Token): Promise<Token> {
    window.localStorage.setItem(AuthService.AUTH_TOKEN, JSON.stringify(token));
    return Promise.resolve(token);
  }

/**
 * Removes the current authenticated token from the DB and the service
 * @returns     a promise from DB operation status
 */
  public logout(): Promise<void> {
    window.localStorage.removeItem(AuthService.AUTH_TOKEN);
    delete this.token;
    return Promise.resolve();
  }

/**
 * Get the current authenticated token
 * @returns     The current authenticated token
 */
  public getToken(): Token {
    return this.token;
  }

}
