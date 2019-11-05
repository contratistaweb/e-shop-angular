import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { auditTrail } from '@angular/fire/database';
import { auth } from 'firebase';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  loginEmail(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }

  getAuth(){
    return this.afAuth.authState.map ( auth => auth );
  }
  

  logout(){
    return this.afAuth.auth.signOut();
  }

  

}


