import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { OauthService } from '../services/oauth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private afAuth: AngularFireAuthModule,
      private authService: OauthService
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.afAuth.authState
    .take(1)
    .map(authState => !! authState)
    .do(authenticated => {
    if(!authenticated){
      this.router.navigate(['/login'])
    }
    })
  }
  
}
