
import { NgModule } from '@angular/core';
import { FormsRoutingModule } from './forms-routing/forms-routing.module';
import { FormsComponent } from './forms.component';
import {FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
// import { BrowserModule } from "@angular/platform-browser";
import {LoadSpinnerModule} from '../load-spinner/load-spinner.module';

import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
  imports: [
    FormsRoutingModule,
    FormsModule,
    CommonModule,
    LoadSpinnerModule,
    AlertModule
  ],
  declarations: [ FormsComponent],
  providers: [],
})
export class customFormsModule {}