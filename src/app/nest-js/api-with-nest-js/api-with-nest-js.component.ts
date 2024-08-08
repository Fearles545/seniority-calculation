import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiWithNestJsService } from './api-with-nest-js.service';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-api-with-nest-js',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    JsonPipe,
    AsyncPipe,
    AuthComponent,
  ],
  templateUrl: './api-with-nest-js.component.html',
  styleUrl: './api-with-nest-js.component.css',
})
export class ApiWithNestJsComponent implements OnInit {
  httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  requestForm!: FormGroup;
  response$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiWithNestJsService
  ) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      url: ['posts'],
      method: ['GET'],
      data: [''],
    });
  }

  onSubmit() {
    switch (this.requestForm.value.method) {
      case 'GET':
        this.response$ = this.apiService.get(
          this.requestForm.value.url,
          this.requestForm.value.data
        );
        break;

      case 'POST':
        debugger;
        this.response$ = this.apiService.post(
          this.requestForm.value.url,
          JSON.parse(this.requestForm.value.data)
        );
        break;

      case 'PUT':
        this.response$ = this.apiService.put(
          this.requestForm.value.url,
          JSON.parse(this.requestForm.value.data)
        );
        break;

      case 'DELETE':
        this.response$ = this.apiService.delete(this.requestForm.value.url);
        break;

      default:
        break;
    }
  }
}
