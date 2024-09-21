import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Duration, intervalToDuration } from 'date-fns';

@Component({
  selector: 'app-seniority-calculator',
  standalone: true,
  imports: [
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './seniority-calculator.component.html',
  styleUrl: './seniority-calculator.component.css',
})
export class SeniorityCalculatorComponent {
  startDate = new FormControl('');
  endDate = new FormControl('');
  duration!: Duration;

  calculateDuration() {
    const start = this.startDate.value;
    const end = this.endDate.value;

    if (start && end) this.duration = intervalToDuration({ start, end });
  }
}
