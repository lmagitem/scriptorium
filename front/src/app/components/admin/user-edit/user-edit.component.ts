import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/service/api/user/user-api.service';
import { User } from 'src/app/model/app/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less'],
})
export class UserEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  userData: User[];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: UserApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      picture: ['', []],
      nickname: ['', []],
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getUser(id) {
    this.apiService.find(id).subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        picture: data['picture'],
        nickname: data['nickname'],
      });
    });
  }
  updateUser() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      picture: [''],
      nickname: [''],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.update(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/users-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
