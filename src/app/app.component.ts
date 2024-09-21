import { Component } from '@angular/core';
import { SeniorityCalculatorComponent } from './seniority-calculator/seniority-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SeniorityCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'seniority calculator';
}
