import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import {AngularFireAuth} from "angularfire2/auth"
import { ChatMessage } from "../models/chat-message.models";
import { userDetails } from '../models/user.model';
import { AuthService } from "../services/auth.service";
import * as firebase from "firebase/app";

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
user: any;
chatMessages: AngularFireList<ChatMessage>;
chatMessage: ChatMessage;
userName: Observable<string>

get messages$(): Observable<ChatMessage[]> {
  return this.db.list<ChatMessage>("messages").snapshotChanges().pipe(
    map((data) => {
      return data.map((dataItem) => {
        return dataItem.payload.val();
      });
    })
  );
}

constructor(
  private db: AngularFireDatabase,
  private afAuth: AngularFireAuth
  ) {
      this.retriveUser();

        // this.getUser().subscribe(a => {
        //   this.userName = a.displayName;
        // });
      
  }

  retriveUser(){
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object<userDetails>(`/users/${userId}`).valueChanges();     
  }

  getUsers() {
    const path = '/users';
    return this.db.list<userDetails>(path);
}

  sendMessage(msg:string) {
    this.getUser().subscribe(user => {
      // console.log(`USR: ${JSON.stringify(user)}`);
      const email = this.user.email;
      const userName = user.displayName;
      const timestamp = Date.now();
      // console.log(`name:` + userName)
      const messageObject = new ChatMessage(email,userName, msg, timestamp );
      this.chatMessages = this.getMessages();
      this.chatMessages.push( messageObject );
    });
    // console.log(`USER : ${JSON.stringify(curUser)}`);
  }


  getMessages() {
    return this.db.list<ChatMessage>("messages");
  }


  // getTimeStamp(){
  //   const now = new Date();
  //   const date = now.getFullYear() + "/" +
  //                (now.getUTCMonth()+  1) + "/" +
  //                now.getUTCDate();   
  //   const time = now.getUTCHours() + "/" +
  //                (now.getUTCMinutes()+  1) + "/" +
  //                now.getUTCSeconds();

    
  //                return (date + " " + time);
                 
  // }
}
