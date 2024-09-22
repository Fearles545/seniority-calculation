import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Duration, intervalToDuration, parse } from 'date-fns';

@Component({
  selector: 'app-single-date-range',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './single-date-range.component.html',
  styleUrl: './single-date-range.component.css',
})
export class SingleDateRangeComponent implements OnInit {
  @Input() period!: AbstractControl<any, any>;
  @Output() calculatedDuration = new EventEmitter<Duration | null>();
  @Output() validPeriod = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.form = this.period as FormGroup;
    this.form.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (
          this.form.controls['startDate'].valid &&
          this.form.value['startDate']?.length &&
          this.form.controls['endDate'].valid &&
          this.form.value['endDate']?.length
        ) {
          // this.calculatedDuration.emit(this.calculateDuration());
          this.validPeriod.emit();
        } else {
          this.calculatedDuration.emit(null);
        }
      });
  }

  calculateDuration() {
    const start = this.form.value.startDate;
    const end = this.form.value.endDate;

    const parsedStart = parse(start, 'dd.MM.yyyy', new Date());
    const parsedEnd = parse(end, 'dd.MM.yyyy', new Date());
    const duration = intervalToDuration({
      start: parsedStart,
      end: parsedEnd,
    });

    return duration;
  }
}
