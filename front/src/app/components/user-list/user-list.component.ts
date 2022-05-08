import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/service/user-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
  user: any = [];
  constructor(private apiService: UserApiService) {
    this.readUser();
  }
  ngOnInit() {}
  readUser() {
    this.apiService.findAll().subscribe((data) => {
      this.user = data;
    });
  }
  removeuser(user, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.delete(user.id).subscribe((data) => {
        this.user.splice(index, 1);
      });
    }
  }
}
