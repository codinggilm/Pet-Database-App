import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { User } from "../types/user.type";
import { Injectable } from "@angular/core";

interface dummyUserListApiResponse {
    limit: number;
    skip: number;
    total: number;
    users: User[];
}

@Injectable({providedIn: 'root'})
export class UserService {

    apiUrl = 'https://dummyjson.com/users?limit=20';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<dummyUserListApiResponse>(this.apiUrl).pipe(map(res => res.users));
    }
}