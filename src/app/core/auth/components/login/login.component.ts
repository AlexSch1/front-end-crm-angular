import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public submit() {}

}
