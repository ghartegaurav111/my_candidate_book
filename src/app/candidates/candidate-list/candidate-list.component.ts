import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCandidateComponent } from './../add-candidate/add-candidate.component';
import { CandidateService } from './../../services/candidate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CandidateModel } from "./../../models/candidate.model";

@Component( {
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html'
} )
export class CandidateListComponent implements OnInit {

  title = 'Candidate List';

  candidates: Array<CandidateModel>;

  dataModel: any = {};

  searchFields = [ { 'key': 'name' }, { 'key': 'gender' }, { 'key': 'technologies' } ];

  constructor( public dialog: MatDialog, private _candidateService: CandidateService ) { }

  ngOnInit() {
    this.refreshCandidateList();
  }

  refreshCandidateList() {
    this._candidateService.subjectEvent
      .subscribe( () => {
        this.getAllCandidates( null );
      } );
  }

  getAllCandidates( searchText ) {
    this._candidateService.getCandidates()
      .subscribe( ( response: Array<CandidateModel> ) => {
        if ( searchText == null || searchText == "" ) {
          if ( this._candidateService.getLocalStorageValueLength( 'candidates' ) >= response.length ) {
            this.candidates = this._candidateService.getLocalStorageItem( 'candidates' );
          } else {
            this.candidates = response;
            this.storeCandidates();
          }
        } else {
          if ( this._candidateService.getLocalStorageValueLength( 'candidates' ) > response.length ) {
            this.candidates = this._candidateService.containsValue( this._candidateService.getLocalStorageItem( 'candidates' ), searchText );
          } else {
            this.candidates = this._candidateService.containsValue( response, searchText );
          }
        }
      }, ( error: HttpErrorResponse ) => {
        this._candidateService.openSnackBar( error, '' );
      } );
  }

  clearSearchField() {
    this.dataModel.searchText = null;
    this.getAllCandidates( this.dataModel.searchText );
  }

  changeStatus( candidateToUpdate: CandidateModel, value: string ) {
    let candidateFound = this._candidateService.getLocalStorageItem( 'candidates' ).find( ( candidate: CandidateModel ) => candidate.id === candidateToUpdate.id );
    candidateToUpdate.status = candidateFound.status = value;
    candidateFound = candidateToUpdate;
    this.storeCandidates();
    this.getCandidateCount();
    return candidateToUpdate;
  }

  getCandidateCount(): Object {
    if ( this.candidates?.length > 0 ) {
      this.dataModel.total = this.candidates?.length;
      this.dataModel.selected = this.candidates.filter( ( candidate: CandidateModel ) => candidate.status == 'Selected' )?.length;
      this.dataModel.rejected = this.candidates.filter( ( candidate: CandidateModel ) => candidate.status == 'Rejected' )?.length;
    }
    return this.dataModel;
  }

  openAddCandidateModal() {
    this.dialog.open( AddCandidateComponent, {
      height: '420px',
      width: '500px',
      data: {}
    } );
  }

  storeCandidates() {
    this._candidateService.clearLocalStorage();
    this._candidateService.setLocalStorageItem( 'candidates', this.candidates );
  }
}
