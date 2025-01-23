import { Routes, RouterModule} from '@angular/router';
import { ListComponent } from './reports/list/list.component';
import { CreateComponent } from './reports/create/create.component';
import { EditComponent } from './reports/edit/edit.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/reports', pathMatch: 'full' },
    { path:'reports', component: ListComponent },
    { path: 'reports/create', component: CreateComponent },
    { path: 'reports/edit/:id', component: EditComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
