import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topic-group',
  standalone: true,
  imports: [RouterLink, NgFor, NgStyle, NgClass],
  templateUrl: './topic-group.component.html',
  styleUrl: './topic-group.component.css',
})
export class TopicGroupComponent {
  @Input() subject!: {
    title: string;
    description: string;
    topics: {
      title: string;
      route: string;
    }[];
    color: string;
  };
}
