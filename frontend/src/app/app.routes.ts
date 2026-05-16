import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { Admin } from './features/admin/admin';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Results } from './features/results/results/results';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './features/polls/home/home';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'signup',component:Signup},
    {path:'admin',component:Admin,canActivate:[adminGuard]},
    {path:'polls/:id/results',component:Results,canActivate:[authGuard]},
    {path:'home',component:Home,canActivate:[authGuard]},
    {path:'',component:Login, pathMatch:'full'}
];
