import { Component, inject } from '@angular/core';

import { Toolbar } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-toolbar',
  imports: [Toolbar, BreadcrumbModule],
  template: `
    <p-toolbar [style]="{ 'border-radius': '0' }">
      <ng-template #start> </ng-template>

      <ng-template #center>
        <h1 class="font-bold text-emerald-200">Калькулятор стажу</h1>
      </ng-template>

      <ng-template #end> </ng-template>
    </p-toolbar>
  `,
  styles: ``,
})
export class ToolbarComponent {}
