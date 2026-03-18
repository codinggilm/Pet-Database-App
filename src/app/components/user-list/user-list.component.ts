import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { User } from "../../types/user.type";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})


export class UserListComponent implements OnInit {

    filteredUsers$!: Observable<User[]>;
    users$!: Observable<User[]>;
    searchSubject = new BehaviorSubject<string>('');

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
        this.filteredUsers$ = this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(searchTerms => this.users$.pipe(
                map(users => users.filter(user => user.firstName.toLowerCase().includes(searchTerms.toLowerCase()))),
                catchError(err => {
                    console.log(err)
                    return of([])
                })
            ))
        )
    }

    searchUsers(event: Event) {
        this.searchSubject.next((event.target as HTMLInputElement).value)
    }

    goToUser(id: number) {
        console.log(id)
        this.router.navigate(['user', id])
    }
}