import { CommonModule, JsonPipe, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Observable } from 'rxjs';

import { ApiWithNestJsService } from '../api-with-nest-js.service';

@Component({
  selector: 'app-auth',
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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  url = this.fb.control('authentication/register');
  method = this.fb.control('POST');

  requestForm!: FormGroup;
  response$!: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiWithNestJsService
  ) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      email: [''],
      name: [''],
      password: [''],
    });
  }

  onSubmit() {
    switch (this.method.value) {
      case 'GET':
        this.response$ = this.apiService.get(
          this.url.value!,
          this.requestForm.value.data
        );
        break;

      case 'POST':
        debugger;
        this.response$ = this.apiService.post(
          this.url.value!,
          this.requestForm.getRawValue()
        );
        break;

      default:
        break;
    }
  }
}
