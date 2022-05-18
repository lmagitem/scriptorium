import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends ApiService<User> {
  protected entityName = "users";
  
  constructor(protected http: HttpClient) {
    super(http);
  }
}
