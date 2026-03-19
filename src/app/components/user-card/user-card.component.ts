import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../types/user.type";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true
})


export class UserCardComponent implements OnInit {

    @Input() user!: User;

    constructor(private router: Router) {}

    ngOnInit(): void {
    }
    
    goToUser(id: number) {
        this.router.navigate(['user', id])
    }
}