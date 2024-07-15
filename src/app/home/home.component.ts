import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { topicsList } from './topics-list';
import { TopicGroupComponent } from './topic-group/topic-group.component';
import { KeyValuePipe, NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TopicGroupComponent,
    KeyValuePipe,
    NgTemplateOutlet,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  topicsList = topicsList;
}
