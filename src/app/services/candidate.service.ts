import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidateModel } from "./../models/candidate.model";
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable( {
  providedIn: 'root'
} )
export class CandidateService {

  localApiUrl: string = "./assets/data/candidates.json";

  subjectEvent = new BehaviorSubject( false );

  constructor( private httpClient: HttpClient, private _snackBar: MatSnackBar ) { }

  // ************ Service to check whether candidate added to refresh all candidate service ************ //
  getUpdatedCandidatesAfterAdd( isCandidateAdded: boolean ) {
    this.subjectEvent.asObservable();
    this.subjectEvent.next( isCandidateAdded );
  }

  // ************ Service to get candidates from json file on first time ************ //
  getCandidates(): Observable<CandidateModel[]> {
    return this.httpClient.get<CandidateModel[]>( `${ this.localApiUrl }` );
  }

  // ************ Service to get local storage item by name ************ //
  getLocalStorageItem( key: string ): Array<CandidateModel> {
    return JSON.parse( localStorage.getItem( key ) );
  }

  // ************ Service to check object value in array ************ //
  containsValue( array: Array<any>, searchFields: Array<string>, searchQuery: string ) {
    return array.filter( ( obj: any ) => {
      return Object.keys( obj ).some( ( key: any ) => {
        if ( searchFields.indexOf( key.toString() ) > -1 ) {
          return obj[ key ] ? obj[ key ].toString().toLowerCase().includes( searchQuery.toLowerCase() ) : null;
        }
      } );
    } );
  }

  // ************ Service to set local storage item by name and value ************ //
  setLocalStorageItem( key: string, data: any ) {
    return localStorage.setItem( key, JSON.stringify( data ) );
  }

  // ************ Service to clear localstorage ************ //
  clearLocalStorage() {
    localStorage.clear();
  }

  // ************ Service to get localstorage key value length ************ //
  getLocalStorageValueLength( key: string ): number {
    return localStorage.getItem( key ) ? JSON.parse( localStorage.getItem( key ) )?.length : 0;
  }

  // ************ Service to show snackbar ************ //
  openSnackBar( message: string | any, action: string ) {
    this._snackBar.open( message, action, {
      duration: 3000,
    } );
  }
}