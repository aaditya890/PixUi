import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
    {
        path:'admin',
        loadComponent: ()=> import('../app/admin-pannel/admin-pannel.component').then((m) => m.AdminPannelComponent),
        canActivate:[authGuard]
        },
      
];
