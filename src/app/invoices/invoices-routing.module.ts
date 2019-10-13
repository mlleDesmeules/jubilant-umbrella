import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './pages/detail/detail.component';
import { ListComponent } from './pages/list/list.component';

import { ListResolverService } from './services/list-resolver.service';
import { DetailResolverService } from './services/detail-resolver.service';

const routes: Routes = [
    {
        path     : ``,
        component: ListComponent,
        resolve  : { list: ListResolverService },
    }, {
        path     : `create`,
        component: DetailComponent,
    }, {
        path     : `invoice/:id`,
        component: DetailComponent,
        resolve  : { invoice: DetailResolverService },
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class InvoicesRoutingModule {}
