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
    this.readuser();
  }
  ngOnInit() {}
  readuser() {
    this.apiService.getusers().subscribe((data) => {
      this.user = data;
    });
  }
  removeuser(user, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteuser(user._id).subscribe((data) => {
        this.user.splice(index, 1);
      });
    }
  }
}
