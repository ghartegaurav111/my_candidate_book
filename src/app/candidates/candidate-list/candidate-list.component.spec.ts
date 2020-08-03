import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateListComponent } from './candidate-list.component';

describe( 'CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule
      ],
      declarations: [
        CandidateListComponent
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    } ).compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( CandidateListComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );

  it( `should have 'Candidate List' as title`, async( () => {
    fixture = TestBed.createComponent( CandidateListComponent );
    component = fixture.debugElement.componentInstance;
    expect( component.title ).toEqual( 'Candidate List' );
  } ) );
} );
