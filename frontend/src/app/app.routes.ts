import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { Admin } from './features/admin/admin';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Results } from './features/results/results/results';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './features/polls/home/home';
import { Profile } from './features/profile/profile/profile';
import { PollDetailComponent } from './features/polls/poll-detail/poll-detail';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'signup',component:Signup},
    {path:'admin',component:Admin,canActivate:[adminGuard]},
    {path:'polls/:id/results',component:Results,canActivate:[authGuard]},
    {path:'polls/:id',component:PollDetailComponent,canActivate:[authGuard]},
    {path:'home',component:Home,canActivate:[authGuard]},
    {path:'profile',component:Profile,canActivate:[authGuard]},
    {path:'',component:Login, pathMatch:'full'}
];
