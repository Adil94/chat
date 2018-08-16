import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { Router } from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth"
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs";
import { User } from '../models/user.model';


@Injectable()
export class AuthService {
  private user : Observable<firebase.User>;
  private authState : any;
  
constructor(
   private afAuth: AngularFireAuth, 
   private db: AngularFireDatabase,
   private router: Router) {
     this.user= afAuth.authState;
   }

   get currentUserID():string {
     return this.authState !== null ? this.authState.user.uid : '';
   }



   signUp(email:string, password:string, displayName: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.authState = user;
      const status = 'online';
      this.setUserData(email,displayName, "online")
    }).catch(error => console.log(error));
   }

   setUserData(email: string, displayName:string, status:string):void{
     const path = `users/${this.currentUserID}`;
    //  console.log(`Useruid ${this.currentUserID}`);
     const data = {
       email: email,
       displayName: displayName,
       status: status
     };

     this.db.object(path).update(data)
      .catch(error => console.log(error))
   }

   setUserStatus( status:string):void{
    const path = `users/${this.currentUserID}`;
    const data = {
      status: status
    };

    this.db.object(path).update(data)
     .catch(error => console.log(error))
  }

  authUser() {
    return this.user;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['chat']);
      });
  }

logout() {
  this.setUserStatus('offline');
  this.afAuth.auth.signOut().then(() => {
    setTimeout(() => {
    this.router.navigate(['signup']);
  }, 500);
  })
  .catch((err) => console.error(err));
}

// -----------------------------------------------------------------------------------------------//

// updateUserData(): void {
//     let path = `users/${this.currentUserID}`; 
//     let data = {
//                   email: this.authState.email,
//                   name: this.authState.displayName
//                 }
//     this.db.object(path).update(data)
//     .catch(error => console.log(error));

//   }

socialSignIn(provider) {
  return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) =>  {
      //  this.authState.email = credential.user.email;
      const email = credential.user.email;
      const name = credential.user.displayName;
      console.log("test: " + email +" " + name)
        this.setUserData(email,name,status)
    })
    .catch(error => console.log(error));
}

googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()
  return this.socialSignIn(provider);
  
}

}