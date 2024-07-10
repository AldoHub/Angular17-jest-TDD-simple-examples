import { inject, Injectable } from '@angular/core';
import { User } from '../shared/types/user';

import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //inject the service
  utilsService = inject(UtilsService);

  constructor() { }

  users: User[] = [];
  
  //observable
  users$ = new BehaviorSubject<User[]>([]);

  addUser(user: User): void {
    this.users = [...this.users, user];
    //use and update the observable
    this.users$.next([...this.users$.getValue(), user]);
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users.filter((user) => userId !== user.id);
    this.users = updatedUsers;

    //use the observable
    const _updatedUsers = this.users$.getValue().filter((user) => userId !== user.id);
    this.users$.next(_updatedUsers);

  }

  //create a new function that uses the new dependency
  getUsernames(): string[] {
    return this.utilsService.pluck(this.users, 'name');
  }

}
