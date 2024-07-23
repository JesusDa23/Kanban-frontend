import { Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: BoardsComponent },    
];
