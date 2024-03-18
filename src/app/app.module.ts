import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MultiplicationTableComponent } from './multiplication-table/multiplication-table.component';
import { SumGameComponent } from './sum-game/sum-game.component';
import { MenuComponent } from './menu/menu.component';
import { BrickBreakerComponent } from './brick-breaker/brick-breaker.component';
import { CommonModule } from '@angular/common';
import { SwayDetectorComponent } from './sway-detector/sway-detector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MultiplicationTableComponent,
    SumGameComponent,
    MenuComponent,
    BrickBreakerComponent,
    SwayDetectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule here
    CommonModule // Include CommonModule if used in your BrickBreakerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
