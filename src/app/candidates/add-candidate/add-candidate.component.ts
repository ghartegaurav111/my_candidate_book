import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateModel } from './../../models/candidate.model';
import { ConfirmDialogModel } from './../../models/confirm-dialog.model';
import { ConfirmDialogComponent } from './../../shared-components/confirm-dialog/confirm-dialog.component';
import { CandidateService } from './../../services/candidate.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component( {
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html'
} )
export class AddCandidateComponent implements OnInit {

  addCandidateForm: FormGroup;

  technologySet: Array<string> = [ "C#", "ASP .Net MVC", "AngularJs", "Angular 2/4/5", "ReactJs", "NodeJs", "MySql", "Testing" ];

  candidates: Array<CandidateModel>;

  constructor( private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) private data: ConfirmDialogModel, private _candidateService: CandidateService ) { }

  ngOnInit() {
    this.getFormField();
  }

  getFormField() {
    this.addCandidateForm = this.formBuilder.group( {
      'name': [ '', Validators.required ],
      'city': [ '' ],
      'gender': [ 'Male', Validators.required ],
      'technologies': new FormArray( [] ),
    } );
  }

  onTechnologyChange( event: any, technology: string ) {
    if ( event?.checked ) {
      this.addCandidateForm.value.technologies.push( technology );
    } else if ( !event?.checked ) {
      this.addCandidateForm.value.technologies.indexOf( technology ) > -1 ? this.addCandidateForm.value.technologies.splice( this.addCandidateForm.value.technologies.indexOf( technology ), 1 ) : false;
    }
  }

  isFormValid( addCandidateForm ) {
    return addCandidateForm?.valid && ( addCandidateForm.value.technologies.length > 0 );
  }

  addCandidate( formData: CandidateModel ) {
    formData.id = Math.floor( Math.random() * 90 + 10 );
    formData.status = 'Interview';
    let candidates = this._candidateService.getLocalStorageItem( 'candidates' );
    candidates.push( formData );
    this._candidateService.setLocalStorageItem( 'candidates', candidates );
    this.refreshCandidateList();
  }

  closeAddCandidateDialog(): void {
    if ( this.addCandidateForm.get( 'name' ).value || this.addCandidateForm.get( 'gender' ).value || this.addCandidateForm.value.technologies.lenght > 0 ) {
      this.openConfirmDialog();
    } else {
      this.refreshCandidateList();
    }
  }

  refreshCandidateList() {
    this.dialogRef.close();
    this._candidateService.openSnackBar( `Candidate ${ this.addCandidateForm?.value?.name } added successfully`, '' );
    this.dialogRef.afterClosed()
      .subscribe( () => {
        this._candidateService.getUpdatedCandidatesAfterAdd( true );
      }, ( error: HttpErrorResponse ) => {
        this._candidateService.openSnackBar( error, '' );
      } );
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      height: '200px',
      width: '400px',
      data: { title: "Confirm Action", message: "Are you sure you want to close this? This may loss data filled by you" }
    } );

    dialogRef.afterClosed()
      .subscribe( dialogResult => {
        if ( dialogResult ) {
          this.dialogRef.close();
        }
      } );
  }
}
