import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { TimePeriodComponent } from '../../components/time-period/time-period.component';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import {
  differenceInDays,
  addDays,
  intervalToDuration,
  parseISO,
} from 'date-fns';

export interface DatePeriodForm {
  isActive: FormControl<boolean>;
  from: FormControl<string>;
  to: FormControl<string>;
}

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    TimePeriodComponent,
    DividerModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [formGroup]="topLevelFormGroup"
      class="flex flex-col gap-4 justify-center items-center w-fit p-3 border-1 border-slate-700 rounded-sm"
    >
      @for (form of formsArray; track form; let i = $index) {
        <div class="flex flex-col justify-center items-center">
          <app-time-period
            [periodFormGroup]="form"
            [index]="i"
            (removePeriod)="onRemovePeriod($event)"
          ></app-time-period>

          <p-divider />
        </div>
      }

      <div class="flex flex-col justify-center items-center gap-5">
        <div class="flex gap-2">
          <p-button
            icon="pi pi-plus-circle"
            label="Додати період"
            [rounded]="true"
            (onClick)="addNewPeriod()"
          ></p-button>
          <!-- <p-button
            icon="pi pi-minus-circle"
            label="Прибрати останній період"
            [rounded]="true"
            variant="outlined"
            (onClick)="removeLastPeriod()"
          ></p-button> -->
        </div>

        <p-button
          label="Розрахувати"
          [rounded]="true"
          (onClick)="calculateTotalActiveDuration()"
          severity="info"
        ></p-button>

        <p>{{ calculatedDuration() }}</p>
      </div>
    </form>

    <p-toast />
    <p-confirmdialog />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
  `,
})
export class HomeComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  #fb = inject(NonNullableFormBuilder);

  topLevelFormGroup = this.#fb.group<{ [key: string]: AbstractControl<any> }>({
    0: this.createFormGroup(),
  });

  formsArray = Object.values(
    this.topLevelFormGroup.controls
  ) as FormGroup<DatePeriodForm>[];

  calculatedDuration = signal<string>('');

  createFormGroup(): FormGroup<DatePeriodForm> {
    return this.#fb.group({
      isActive: this.#fb.control(true),
      from: this.#fb.control(''),
      to: this.#fb.control(''),
    });
  }

  addNewPeriod() {
    const newFormGroup = this.createFormGroup();
    this.topLevelFormGroup.addControl(
      this.formsArray.length.toString(),
      newFormGroup
    );
    this.formsArray = Object.values(
      this.topLevelFormGroup.controls
    ) as FormGroup<DatePeriodForm>[];
  }

  removeLastPeriod() {
    if (this.formsArray.length > 1) {
      const controlName = (this.formsArray.length - 1).toString();
      this.topLevelFormGroup.removeControl(controlName);
      this.formsArray = Object.values(
        this.topLevelFormGroup.controls
      ) as FormGroup<DatePeriodForm>[];
    }
  }

  /**
   * Calculates the total duration of all active periods in years, months, and days.
   * @returns {string} Formatted duration string (e.g., "2 years, 3 months, 5 days")
   */
  calculateTotalActiveDuration(): void {
    let totalDays = 0;

    for (const form of this.formsArray) {
      const { isActive, from, to } = form.value;
      if (isActive && from && to) {
        // Parse dates (assumes ISO strings or Date objects)
        const fromDate = typeof from === 'string' ? parseISO(from) : from;
        const toDate = typeof to === 'string' ? parseISO(to) : to;
        if (
          fromDate &&
          toDate &&
          !isNaN(fromDate.getTime()) &&
          !isNaN(toDate.getTime())
        ) {
          // Add 1 to include both endpoints if needed
          totalDays += differenceInDays(toDate, fromDate) + 1;
        }
      }
    }

    // Convert total days to years, months, days
    const base = new Date(0);
    const totalDate = addDays(base, totalDays);
    const duration = intervalToDuration({ start: base, end: totalDate });

    // Format result
    const parts = [];
    // Ukrainian pluralization for years, months, days
    if (duration.years) {
      parts.push(
        `${duration.years} ${this.pluralize(duration.years, ['рік', 'роки', 'років'])}`
      );
    }
    if (duration.months) {
      parts.push(
        `${duration.months} ${this.pluralize(duration.months, ['місяць', 'місяці', 'місяців'])}`
      );
    }
    if (duration.days) {
      parts.push(
        `${duration.days} ${this.pluralize(duration.days, ['день', 'дні', 'днів'])}`
      );
    }
    this.calculatedDuration.set(parts.length ? parts.join(', ') : '0 days');
  }

  /**
   * Pluralizes a Ukrainian noun based on the provided number.
   * @param count The number to determine the plural form.
   * @param forms Array of [singular, paucal, plural] forms.
   * @returns The correct form for the given count.
   *
   * Example:
   *   pluralize(1, ['рік', 'роки', 'років']) // 'рік'
   *   pluralize(2, ['рік', 'роки', 'років']) // 'роки'
   *   pluralize(5, ['рік', 'роки', 'років']) // 'років'
   */
  pluralize(count: number, forms: [string, string, string]): string {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) {
      return forms[0];
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return forms[1];
    }
    return forms[2];
  }

  removePeriod(index: number) {
    this.topLevelFormGroup.removeControl(index.toString());
    this.formsArray = Object.values(
      this.topLevelFormGroup.controls
    ) as FormGroup<DatePeriodForm>[];
  }

  onRemovePeriod(index: number) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Ви дійсно хочете видалити період?',
      header: 'Підтвердження',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Відмінити',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'ОК',
      },
      accept: () => {
        this.removePeriod(index);

        this.messageService.add({
          severity: 'info',
          // summary: 'Confirmed',
          detail: 'Період видалено',
        });
      },
      reject: () => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Rejected',
        //   detail: 'You have rejected',
        //   life: 3000,
        // });
      },
    });
  }
}
