import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DatePicker } from 'primeng/datepicker';
import { Checkbox } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-time-period',
  templateUrl: './time-period.component.html',
  styleUrl: './time-period.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DatePicker, Checkbox, ButtonModule],
})
export class TimePeriodComponent {
  periodFormGroup = input.required<FormGroup>();
  index = input.required<number>();
  removePeriod = output<number>();
}
