import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User, userDetails } from '../models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: Partial<userDetails> = {  };

  constructor() { }

  ngOnInit() {
  }

  
}