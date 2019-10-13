import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Invoice } from '../models';
import { InvoiceService } from './invoice.service';

@Injectable({
    providedIn: 'root',
})
export class ListResolverService implements Resolve<Invoice[]> {

    constructor(private service: InvoiceService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Invoice[] {
        return this.service.get();
    }
}
