import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
  user: any = [];
  constructor(private apiService: ApiService) {
    this.readUser();
  }
  ngOnInit() {}
  readUser() {
    this.apiService.getUsers().subscribe((data) => {
      this.user = data;
    });
  }
  removeuser(user, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteUser(user.id).subscribe((data) => {
        this.user.splice(index, 1);
      });
    }
  }
}
