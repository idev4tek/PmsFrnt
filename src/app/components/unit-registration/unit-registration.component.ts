import { Component, AfterViewInit, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-unit-registration',
  templateUrl: './unit-registration.component.html',
  styleUrls: ['./unit-registration.component.scss']
})
export class UnitRegistrationComponent implements OnInit, AfterViewInit {
  isLinear = true;
  isEditable = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  addCustomerFormGroup: FormGroup = Object.create(null);

  samePaymentAddress = true;
  sameNomineeAddress = true;
  l = [1,2,3,4]
  @ViewChild('customerBuyerDialog') customTemplate: TemplateRef<any>;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog){
    this.customTemplate = Object.create(null);
  }

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      rgst_nmbr: ['', Validators.required],
      unt_typ_key: ['', Validators.required],
      unt_sub_typ: ['', Validators.required],
      prd_area: ['', Validators.required],
      prd_bs_prc: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
      // rgst_nmbr: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.addCustomerFormGroup = this._formBuilder.group({
      cnic_nmbr: ['', Validators.required],
      cnic_expry_dt: ['', Validators.required],
      cust_nm: ['', Validators.required],
      fathr_hsbnd_nm: ['', Validators.required],
      cust_id: ['', Validators.required],
      dob: ['', Validators.required],
      occ_key: ['', Validators.required],//occupation
      nlty_key: ['', Validators.required],//nationality
      pspt_nmbr: ['', Validators.required],//passport number
      pspt_isu_cntry: ['', Validators.required],//passport issue country
      pspt_expry_dt: ['', Validators.required],
      prm_phon_nmbr: ['', Validators.required],
      scndry_phon_nmbr: ['', Validators.required],
      email_addr: ['', Validators.required],
      preasent_address: this._formBuilder.group({        
        address: ['', Validators.required],
        cty_key: ['', Validators.required],
      })
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.customTemplate, {
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  BuyerSave() {
    console.log('Buyer saved and dialog was closed');
  }
}
