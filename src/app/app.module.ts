import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ****************** Material Components ******************* //
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// ******************** App Components ********************* //
import { AppComponent } from './app.component';
import { CandidateListComponent } from './candidates/candidate-list/candidate-list.component';
import { AddCandidateComponent } from './candidates/add-candidate/add-candidate.component';

// ******************** Shared Components ********************* //
import { HeaderComponent } from './shared-components/header/header.component';
import { ConfirmDialogComponent } from './shared-components/confirm-dialog/confirm-dialog.component';

// ************************ Services *********************** //
import { CandidateService } from './services/candidate.service';

@NgModule( {
  declarations: [
    AppComponent,
    HeaderComponent,
    CandidateListComponent,
    AddCandidateComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [ CandidateService ],
  entryComponents: [ ConfirmDialogComponent ],
  bootstrap: [ AppComponent, ]
} )
export class AppModule { }
