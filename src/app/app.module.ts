import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InvoicesModule } from './invoices/invoices.module';

import { DefaultComponent } from './layout/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,

        DefaultComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports     : [
        BrowserModule,
        AppRoutingModule,

        InvoicesModule,
    ],
    providers   : [],
    bootstrap   : [ AppComponent ],
})
export class AppModule {}
