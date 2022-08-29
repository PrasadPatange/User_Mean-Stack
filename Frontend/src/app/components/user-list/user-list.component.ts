import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: any = [];
  modalRef!: BsModalRef;
  constructor(
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.userList = res;
      console.log('data : ', this.userList);
    });
  }

  deleteData(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log('deleted Data : ', res);
      this.getAllUsers();
    });
  }
  // Modal
  UserSingleData!: any;

  openModal(template: TemplateRef<any>, userId: any) {
    this.userService.getAllUsers().subscribe((data: any) => {
      data.forEach((user: any, i: any) => {
        user = this.userList[i];
        if (userId == user._id) {
          this.modalRef = this.modalService.show(template);
          this.UserSingleData = user;
          console.log('id : ', user._id);
          console.log('Data : ', user);
        }
      });
    });
  }
}
