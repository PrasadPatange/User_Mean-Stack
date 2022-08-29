import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  userDetails = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
  });

  get f() {
    return this.userDetails.controls;
  }

  addUserData() {
    console.log('User Data : ', this.userDetails.value);
    let data = this.userDetails.value;
    this.userService.createUser(data).subscribe({
      next: (user) => {
        this.route.navigate(['/user-list']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
