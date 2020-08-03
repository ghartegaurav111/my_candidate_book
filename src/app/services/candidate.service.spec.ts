import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CandidateService } from './candidate.service';
import { CandidateModel } from "./../models/candidate.model";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe( 'CandidateService', () => {
  let candidateService: CandidateService;
  let httpMock: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        CandidateService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    } );

    candidateService = TestBed.get( CandidateService );
    httpMock = TestBed.get( HttpTestingController );
  } );

  it( `should fetch candidates as an Observable`, async( inject( [ HttpTestingController, CandidateService ],
    ( httpClient: HttpTestingController, candidateService: CandidateService ) => {
      candidateService.getCandidates()
        .subscribe( ( candidates: Array<CandidateModel> ) => {
          expect( candidates.length ).toBe( 4 );
        } );

      let req = httpMock.expectOne( './assets/data/candidates.json' );
      expect( req.request.method ).toBe( "GET" );
    } ) ) );
} );