import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './../redux/app.reducer';

import {
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { FooterLinkComponent } from './footer/footer-link.component';
import { NewTodoComponent } from './new-todo/new-todo.component';

const routes: Routes = [
  // basic routes
  { path: '', component: FooterComponent, pathMatch: 'full' },
  { path: ':filter', component: FooterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    FooterComponent,
    FooterLinkComponent,
    NewTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
