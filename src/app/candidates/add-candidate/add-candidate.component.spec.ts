import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCandidateComponent } from './add-candidate.component';
import { ConfirmDialogComponent } from './../../shared-components/confirm-dialog/confirm-dialog.component';

describe( 'AddCandidateComponent', () => {
  let component: AddCandidateComponent;
  let fixture: ComponentFixture<AddCandidateComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      declarations: [
        AddCandidateComponent,
        ConfirmDialogComponent
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: "Confirm Action", message: "Are you sure you want to close this? This may loss data filled by you" }
        }
      ],
    } ).compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( AddCandidateComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
