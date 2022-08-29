import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

   userData:any = {
    name: '',
    age: 0
  };
  constructor(
    private userService: UserService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
      this.router.paramMap.subscribe((param) => {
      let id = String(param.get('id'));
      console.log("id : ",id);
      this.getDataById(id);
    });
  }
  getDataById(id: any) {
    this.userService.getUserById(id).subscribe((data: any) => {
      this.userData = data;
      console.log("edit data : ",data);
    });
  }
  updateUserData() {
    console.log("user Data : ",this.userData);
    this.userService.updateUser(this.userData).subscribe({
      next: (data) => {
        this.route.navigate(['/user-list']);
        console.log('Edited Data : ',data);
      },
      error: (err) => {
        console.log("Error : ",err);
      },
    });
}
}
