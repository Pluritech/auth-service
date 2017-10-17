import { Injectable, Inject } from '@angular/core';

import { Token } from './auth.token';
import { AuthStatus } from './auth.status';

export const getKeyToken = (keyCustom: string) => keyCustom || AuthService.AUTH_TOKEN;

/**
 * A service to store and control the token of authenticated user on pluritech applications
 */
@Injectable()
export class AuthService {

  public static AUTH_TOKEN = 'AUTH_TOKEN_KEY';
  private token: Token;

  constructor(@Inject('keyToken') private keyToken: any) {
    AuthService.AUTH_TOKEN = keyToken;
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
  public isLogged(keyTokenCustom?: string): Promise<AuthStatus> {
    if (this.checkIsLogged()) {
      return Promise.resolve(AuthStatus.AUTHENTICATED);
    }
    const stringifiedToken = window.localStorage.getItem(getKeyToken(keyTokenCustom));

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
  public login(token: Token, keyTokenCustom?: string): Promise<Token> {
    this.token = token;
    window.localStorage.setItem(getKeyToken(keyTokenCustom), JSON.stringify(token));
    return Promise.resolve(token);
  }

/**
 * Removes the current authenticated token from the DB and the service
 * @returns     a promise from DB operation status
 */
  public logout(keyTokenCustom?: string): Promise<void> {
    window.localStorage.removeItem(getKeyToken(keyTokenCustom));
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
