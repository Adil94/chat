import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from "rxjs";
import { ChatMessage } from '../models/chat-message.models';
import { ChatService } from '../services/chat.service';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnChanges {
  feed: Observable<any> = this.chat.messages$;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // this.feed = this.chat.getMessages();
  }

  ngOnChanges() {
    // this.feed = this.chat.getMessages();
  }
}
