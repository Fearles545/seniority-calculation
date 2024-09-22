import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Duration, intervalToDuration, parse } from 'date-fns';
import { SingleDateRangeComponent } from './single-date-range/single-date-range.component';
import { DATE_PATTERN } from '../core/date.patters';
import { sumDurations } from '../core/sum-duration';

@Component({
  selector: 'app-seniority-calculator',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SingleDateRangeComponent,
  ],
  templateUrl: './seniority-calculator.component.html',
  styleUrl: './seniority-calculator.component.css',
})
export class SeniorityCalculatorComponent implements OnInit {
  duration!: Duration | null;
  durationProxy: Duration[] = [];
  periods!: FormArray<FormGroup>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.periods = this.fb.array([
      this.fb.group({
        startDate: ['', Validators.pattern(DATE_PATTERN)],
        endDate: ['', Validators.pattern(DATE_PATTERN)],
      }),
    ]);
  }

  onCalculatedDuration(duration: Duration | null) {
    // this.duration = duration;
  }

  onValidPeriod() {
    const newPeriod = this.fb.group({
      startDate: ['', Validators.pattern(DATE_PATTERN)],
      endDate: ['', Validators.pattern(DATE_PATTERN)],
    });
    this.periods.push(newPeriod);
  }

  calculateDuration() {
    this.periods.controls.forEach((period) => {
      if (
        period.controls['startDate'].valid &&
        period.value['startDate']?.length &&
        period.controls['endDate'].valid &&
        period.value['endDate']?.length
      ) {
        const startDate = period.value['startDate'];
        const endDate = period.value['endDate'];
        this.durationProxy.push(this.calculatePeriods(startDate, endDate));
      }
    });

    this.duration = this.durationProxy.length
      ? sumDurations(this.durationProxy)
      : null;
  }

  calculatePeriods(start: string, end: string) {
    const parsedStart = parse(start, 'dd.MM.yyyy', new Date());
    const parsedEnd = parse(end, 'dd.MM.yyyy', new Date());
    return intervalToDuration({
      start: parsedStart,
      end: parsedEnd,
    });
  }
}
