import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';

import { TablesRoutingModule } from './tables-routing/tables-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SearchFilterPipe } from './search-filter.pipe';
import {LoadSpinnerModule} from '../load-spinner/load-spinner.module';
import { AlertModule } from '../shared/alert/alert.module';
@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    LoadSpinnerModule,
    AlertModule
  ],
  declarations: [ TablesComponent, UserDetailComponent, SearchFilterPipe]
})
export class TablesModule { }
