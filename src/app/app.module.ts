import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import {
  AppComponent,
  MainPageComponent,
  OrderPageComponent,
  ConfirmModalComponent,
  SearchModalComponent,
  InfoModalComponent
} from './components';
import { APIService } from './services';
import { environment } from 'src/environments/environment';
import { IEnvironment } from 'src/environments/models';

export const ENV_TOKEN = new InjectionToken<IEnvironment>('environment');

@NgModule({
  declarations: [
    AppComponent,
    OrderPageComponent,
    MainPageComponent,
    ConfirmModalComponent,
    SearchModalComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [APIService, { provide: ENV_TOKEN, useFactory: () => environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
