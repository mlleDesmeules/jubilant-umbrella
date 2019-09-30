import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';

const routes: Routes = [
    {
        path: ``,
        component: DefaultComponent,
        loadChildren: () => import(`./invoices/invoices.module`).then(m => m.InvoicesModule),
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
