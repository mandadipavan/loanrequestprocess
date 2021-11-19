import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BlankTemplateComponent } from "./template/blank-template.component";
import { LeftNavTemplateComponent } from "./template/left-nav-template.component";
import { AppRoutingModule, routes } from "./app.routing";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HeaderComponent } from "./shared/header/header.component";
import { NavigationComponent } from "./shared/navigation/navigation.component";
import {HttpClientModule} from '@angular/common/http';
//import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { customFormsModule } from './forms/forms.module';
import { AlertModule } from "./shared/alert/alert.module";
//import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
//import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    BlankTemplateComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LeftNavTemplateComponent,
    NavigationComponent,
  ],
  imports: [
    AlertModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    customFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
