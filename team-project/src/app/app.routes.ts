import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ColorDatabaseComponent } from './pages/color-database/color-database.component';
import { ColorGridComponent } from './pages/color-grid/color-grid.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'color-database', component: ColorDatabaseComponent },
    { path: 'grid', component: ColorGridComponent }
];
