import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanAllModule, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  NumericTextBoxAllModule,
  TextBoxAllModule,
} from '@syncfusion/ej2-angular-inputs';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KanbanModule,
    FormsModule,
    CommonModule,
    KanbanAllModule,
    DialogModule,
    CheckBoxAllModule,
    DatePickerModule,
    DropDownListAllModule,
    NumericTextBoxAllModule,
    TextBoxAllModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'kanban-78145',
        appId: '1:390110944638:web:31979edb6a09eac21d272f',
        storageBucket: 'kanban-78145.appspot.com',
        apiKey: 'AIzaSyCm7k79BhsfZnwGkrwjIQ2-u8gQIiViMwo',
        authDomain: 'kanban-78145.firebaseapp.com',
        messagingSenderId: '390110944638',
      })
    ),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
