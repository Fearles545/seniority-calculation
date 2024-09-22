import { Routes } from '@angular/router';

import { SeniorityCalculatorComponent } from './seniority-calculator/seniority-calculator.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: SeniorityCalculatorComponent,
    title: 'Калькулятор стажу',
  },
];
