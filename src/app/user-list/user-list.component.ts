import { Component, OnInit ,Input, Output } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User, userDetails } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {
  users: any[];
 
  @Input() user: Partial<userDetails> = {  };


  constructor(
    private chat: ChatService
  ) {
  }
  
  ngOnInit() {  
    this.chat.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }
  
  returnOnlineUser() {
    return this.users.filter(user => user.status === 'online');
    }
}