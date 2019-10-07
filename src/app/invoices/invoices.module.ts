import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
    declarations: [
        ListComponent,
        DetailComponent,
        ContactComponent
    ],
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        InvoicesRoutingModule,
    ],
})
export class InvoicesModule {}
