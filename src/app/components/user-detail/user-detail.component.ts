import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { map, Observable, switchMap } from "rxjs";
import { User } from "../../types/user.type";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-user-detail',
    imports: [AsyncPipe],
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss',
    standalone: true
})

export class UserDetailComponent implements OnInit {

    user$!: Observable<User>;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.user$ = this.activatedRoute.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                return this.userService.getUsers().pipe(
                    map(users => users.filter(user => user.id === Number(id))[0])
                )
            })
        )
    }

    goBack() {
        this.router.navigate([''])
    }
}