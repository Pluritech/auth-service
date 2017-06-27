import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

export * from './auth.service';
export * from './auth.status';
export * from './auth.token';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AuthServiceModule {
  static forRoot(keyToken: string): ModuleWithProviders {
    return {
      ngModule: AuthServiceModule,
      providers: [AuthService,  {provide: 'keyToken', useValue: keyToken}]
    };
  }
}
