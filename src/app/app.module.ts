import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { PawnComponent } from './pawn/pawn.component';
import { KingComponent } from './king/king.component';
import { CheckersService } from './checkers.service';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    PawnComponent,
    KingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CheckersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
