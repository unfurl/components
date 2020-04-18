import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import {PreviewModule} from '../../../components/src/app/preview.module';
window['Unfurl']?.setConfig({apiToken: 'mdi61be6EhHH8Tdcqt5twdltZmFKRhiF87lWONb7hiF6PODKlHiHOMaQNSMW'});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    // PreviewModule.forRoot({ apiToken: 'mdi61be6EhHH8Tdcqt5twdltZmFKRhiF87lWONb7hiF6PODKlHiHOMaQNSMW'}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
