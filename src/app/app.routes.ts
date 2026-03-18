import { Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'user/:id', component: UserDetailComponent }
];
