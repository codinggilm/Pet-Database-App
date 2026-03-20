import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { BehaviorSubject, catchError, combineLatestWith, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { User } from "../../types/user.type";
import { Router } from "@angular/router";
import { PaginationComponent } from "../pagination/pagination.component";
import { PageSize } from "../../config/config";
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
    selector: 'app-user-list',
    imports: [AsyncPipe, PaginationComponent, UserCardComponent],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: true
})


export class UserListComponent implements OnInit {

    filteredUsers$!: Observable<User[]>;
    users$!: Observable<User[]>;
    searchSubject = new BehaviorSubject<string>('');
    selectedPageSubject = new BehaviorSubject<number>(1);
    currentPage!: number;
    pageSize = PageSize;
    userCount!: number;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
        this.filteredUsers$ = this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            combineLatestWith(this.selectedPageSubject),
            switchMap(([searchTerms, page]) => this.users$.pipe(
                map(users => this.getDisplayedUsers(users, searchTerms, page)),
                catchError(err => {
                    console.log(err)
                    return of([])
                })
            ))
        )
    }

    getDisplayedUsers(users: User[], searchTerms: string, page: number) : User[] {
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const filteredUsers =  users.filter(user => user.firstName.toLowerCase().includes(searchTerms.toLowerCase()));

        this.currentPage = page;
        this.userCount = filteredUsers.length;
        return filteredUsers.slice(startIndex, endIndex);
    }
    

    searchUsers(event: Event) {
        this.searchSubject.next((event.target as HTMLInputElement).value);
    }

    goToUser(id: number) {
        this.router.navigate(['user', id]);
    }

    setPage(pageNumber: number) {
        this.selectedPageSubject.next(pageNumber);
    }

    nextPage() {
        this.selectedPageSubject.next(this.currentPage + 1);
    }

    previousPage() {
        this.selectedPageSubject.next(this.currentPage - 1);
    }
}