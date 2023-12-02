import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],

  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // чтобы не перезаписать по ключу HTTP_INTERCEPTORS интерсепторы, а добавить туда новый
      // если мы укажем false то в HTTP_INTERCEPTORS стандартные заменятся нашим единственным, который мы сейчас указали (AuthInterceptor)
    }
  ]
})
export class CoreModule {
}
