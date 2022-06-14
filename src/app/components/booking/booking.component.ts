import { Overlay } from '@angular/cdk/overlay';
import { Component, AfterViewInit, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, AfterViewInit {
  isLinear = true;
  isEditable = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  addCustomerFormGroup: FormGroup = Object.create(null);
  chargesFormGroup: FormGroup = Object.create(null);
  discountsFormGroup: FormGroup = Object.create(null);

  samePaymentAddress = true;
  sameNomineeAddress = true;
  l = [1, 2]
  @ViewChild('customerBuyerDialog') customTemplate: TemplateRef<any>;

  editing: any = {};
  rows: any = new Array;
  _rows: any = new Array;
  temp: any[];

  loadingIndicator = true;
  reorderable = true;


  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
  _data = [
    { name: 'Ethel Price', gender: 'female', company: 'Johnson', age: 22 }
    , { name: 'Claudine Neal', gender: 'female', company: 'Sealoud', age: 55 }
    , { name: 'Beryl Rice', gender: 'female', company: 'Velity', age: 67 }
  ]

  chargesArray = [{ chargeId: "123456", description: "Utility", calculateAmount: "20,000", actualAmount: "18,000", paymentScheme: "Instalments", status: "Approved", dst: [], sgr: [] },
  { chargeId: "123456", description: "Utility", calculateAmount: "20,000", actualAmount: "18,000", paymentScheme: "Instalments", status: "Approved", dst: [], sgr: [] },]
  discountsArray = [{ id: "123456", name: "Ashraf", calculateAmount: "50,000", actualAmount: "46,000", status: "Approved", dst: [], sgr: [] },
  { id: "123456", name: "Kahlid", calculateAmount: "23,000", actualAmount: "16,000", status: "Approved", dst: [], sgr: [] },]

  prd_ip_mnth = Number("60")

  displayedColumns: string[] = ['name', 'gender', 'age', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  presetSegrigation: any[] = [];
  presetDistribution: any[] = [];

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private overlay: Overlay) {
    this.customTemplate = Object.create(null);

    this.rows = this._data;
    this.temp = [...this._data];
    console.log(this._data);

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      rgst_nmbr: ['', Validators.required],
      unt_typ_key: ['', Validators.required],
      unt_sub_typ: ['', Validators.required],
      prd_area: ['', Validators.required],
      prd_bs_prc: ['', Validators.required],
      charges: this._formBuilder.array([]),
      prd_net_pay: ['', Validators.required] //total charges plus base price minus discount
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
      cnicNumber: ['', Validators.required],
      cnicExpiryDate: ['', Validators.required],
      cust_nm: ['', Validators.required],
      fatherSpouseName: ['', Validators.required],
      customerId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      occupationKey: ['', Validators.required],//occupation
      nationalityKey: ['', Validators.required],//nationality
      passportNumber: ['', Validators.required],//passport number
      issueCountryKey: ['', Validators.required],//passport issue country
      passportExpiryDate: ['', Validators.required],//passport expiry
      primaryPhoneNumber: ['', Validators.required],// phone office
      secondaryPhoneNumber: ['', Validators.required],//phone home
      emailAddress: ['', Validators.required],//email
      paymentAddressSameAsPermanentAddress: [true],//paymentaddress checkbox
      present_address: this._formBuilder.group({
        address: ['', Validators.required],
        cty_key: ['', Validators.required],
        stt_key: ['', Validators.required],
        cntry_key: ['', Validators.required],
        hse_nmbr: ['', Validators.required],
        strt_nm: ['', Validators.required],
        oth_dtl: ['', Validators.required],
      }),
      payment_address: new FormGroup({}),
      nom_cnic_nmbr: ['', Validators.required],
      // nominee name where??
      nom_name: [""],
      rltn_key: ['', Validators.required],
      nomineeAddressSameAsPermanentAddress: [true],//paymentaddress checkbox
      nominee_address: new FormGroup({}),
      //must have in address
      //       hse_nmbr varchar(25) 
      //       strt_nm varchar(50) 
      //       oth_dtl varchar(100) 
      //       cty_key
      doc: this._formBuilder.group({
        doc_key: ['', Validators.required],
        doc: ['', Validators.required],
      })

      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
      // cust_nm: ['', Validators.required],
    });

    this.chargesFormGroup = this._formBuilder.group({
      index: [null],
      chargeId: [""],
      description: ["", [Validators.required]],
      calculateAmount: ["", [Validators.required]],
      actualAmount: ["", [Validators.required]],
      paymentScheme: ["", [Validators.required]],
      status: ["", [Validators.required]],
      dst: [],
      sgr: []
    })

    this.discountsFormGroup = this._formBuilder.group({
      index: [null],
      id: [""],
      name: ["", [Validators.required]],
      calculateAmount: ["", [Validators.required]],
      actualAmount: ["", [Validators.required]],
      status: ["", [Validators.required]],
      dst: [],
      sgr: []
    })

    this.addReactiveFormValues()
    this.addDistributioAndSegrigation();
    this.addOrRemoveReacticeFormValueViaAnotherReactiveValue()
  }

  addReactiveFormValues() {
    this.rows.forEach((z: any) => {
      this.addCharges(z.name, z.gender, z.age);
    });
  }

  ngAfterViewInit() {
    console.log(this.firstFormGroup);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.customTemplate, {
      width: '100%',
      panelClass: "dialogBackground",
      scrollStrategy: this.overlay.scrollStrategies.block()
    });

    dialogRef.afterClosed().subscribe((x) => {
      console.log('The dialog was closed');
    });
  }

  BuyerSave() {
    console.log('Buyer saved and dialog was closed');
  }

  updateValue(event: any, cell: any, rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  firstItrativeFromControl(array: Array<any>): FormControl {
    let ff: any;
    if (array.length >= 1) ff = this.firstFormGroup.get(array[0] + '');
    for (let i = 1; i < array.length; i++) {
      const x = array[i];

      ff = ff.get(x + '');

    }
    // console.log(ff)
    return ff;
  }

  itrativeFromControl(array: Array<any>, formGroup: FormGroup): FormControl {
    let ff: any;
    if (array.length >= 1) ff = formGroup.get(array[0] + '');
    for (let i = 1; i < array.length; i++) {
      const x = array[i];

      ff = ff.get(x + '');

    }
    // console.log(ff)
    return ff;
  }

  //Use Itrative form controlle insted
  // getFormControlByGroupName(formGroup:FormGroup, formGroupName:string, i:any){
  //   return formGroup.get(formGroupName+'').get(i+"")
  // }

  // reactive array can be made mode dynamic
  addCharges(name: string, gender: string, age: number) {
    //form group array
    this.addFormGroupToFormArray(this.firstFormGroup, "charges", {
      name: new FormControl(name, [Validators.required]),
      gender: new FormControl(gender, [Validators.required]),
      age: new FormControl(age, [Validators.required])
    })
  }

  removeCharges(i: number) {
    this.getFormArrayByFormGroup(this.firstFormGroup, "charges").removeAt(i);
  }
  //

  getFormArrayByFormGroup(formGroup: FormGroup, formGroupName: string): FormArray {
    return formGroup.get(formGroupName + "") as FormArray
  }

  addFormGroupToFormArray(formGroup: FormGroup, formGroupName: string, formGroupStructure: Object) {
    let t = new FormGroup(formGroupStructure as any)
    this.getFormArrayByFormGroup(formGroup, formGroupName).push(t);
  }


  _openDialog(temp: TemplateRef<any>, data = null as any): void {
    let options = {
      width: '100%',
      data,
      disableClose: false
    }
    if (data) { options['disableClose'] = true }
    const dialogRef = this.dialog.open(temp, options);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  addCharge(temp: TemplateRef<any>, index = -1) {
    //add edit charges
    this._openDialog(temp);

    this.chargesFormGroup.reset()

    if (index == -1) {
      //new
      this.chargesFormGroup.get("dst")?.patchValue(JSON.parse(JSON.stringify(this.presetDistribution)));
      this.chargesFormGroup.get("sgr")?.patchValue(JSON.parse(JSON.stringify(this.presetSegrigation)));
    } else {
      //old
      this.chargesFormGroup.get("index")?.patchValue(index);
      this.chargesFormGroup.get("chargeId")?.patchValue(this.chargesArray[index]['chargeId']);
      this.chargesFormGroup.get("description")?.patchValue(this.chargesArray[index]['description']);
      this.chargesFormGroup.get("calculateAmount")?.patchValue(this.chargesArray[index]['calculateAmount']);
      this.chargesFormGroup.get("actualAmount")?.patchValue(this.chargesArray[index]['actualAmount']);
      this.chargesFormGroup.get("paymentScheme")?.patchValue(this.chargesArray[index]['paymentScheme']);
      this.chargesFormGroup.get("status")?.patchValue(this.chargesArray[index]['status']);
      this.chargesFormGroup.get("dst")?.patchValue(this.chargesArray[index]['dst']);
      this.chargesFormGroup.get("sgr")?.patchValue(this.chargesArray[index]['sgr']);
    }

  }

  updateCharges() {

    let data = this.chargesFormGroup.value;
    let index = data['index'];

    if (index != null) {
      this.chargesArray[index] = data;
    } else {
      this.chargesArray.push(data)
    }
  }

  deleteCharges(index = null as any) {
    //add edit charges
    if (index || index == 0) {
      this.chargesArray.splice(index, 1)
      console.log(index);
    }
  }


  addDiscount(temp: TemplateRef<any>, index = -1) {
    //add edit charges
    this._openDialog(temp);

    this.discountsFormGroup.reset()

    if (index >= 0) {
      //old
      this.discountsFormGroup.get("index")?.patchValue(index);
      this.discountsFormGroup.get("id")?.patchValue(this.discountsArray[index]['id']);
      this.discountsFormGroup.get("name")?.patchValue(this.discountsArray[index]['name']);
      this.discountsFormGroup.get("calculateAmount")?.patchValue(this.discountsArray[index]['calculateAmount']);
      this.discountsFormGroup.get("actualAmount")?.patchValue(this.discountsArray[index]['actualAmount']);
      this.discountsFormGroup.get("status")?.patchValue(this.discountsArray[index]['status']);
      this.discountsFormGroup.get("dst")?.patchValue(this.discountsArray[index]['dst']);
      this.discountsFormGroup.get("sgr")?.patchValue(this.discountsArray[index]['sgr']);
    } else {
      //new entry
      this.discountsFormGroup.get("dst")?.patchValue(JSON.parse(JSON.stringify(this.presetDistribution)));
      this.discountsFormGroup.get("sgr")?.patchValue(JSON.parse(JSON.stringify(this.presetSegrigation)));
    }

  }

  updateDiscounts() {
    //add edit charges
    let dataTmp = {
      chargeId: "",
      description: "",
      calculateAmount: "",
      actualAmount: "",
      paymentScheme: "",
      status: "",
    }
    let data = this.discountsFormGroup.value;
    let index = data['index'];

    if (index != null) {
      this.discountsArray[index] = data;
    } else {
      this.discountsArray.push(data)
    }
  }

  deleteDiscount(index = null as any) {
    //add edit charges
    if (index || index == 0) {
      this.chargesArray.splice(index, 1)
      console.log(index);
    }
  }

  openSegrigationDialog(temp: TemplateRef<any>, data = null as any) {
    console.log(data);

    if (data) this._openDialog(temp, data);
    else this._openDialog(temp);
  }

  addDistributioAndSegrigation() {
    //segrigation
    this.prd_ip_mnth;
    let qauterInMonth = this.prd_ip_mnth / 3;
    let byAnualsInMonth = this.prd_ip_mnth / 6;
    let yearsInMonth = this.prd_ip_mnth / 12;

    //prd_ip_typ_key
    //month = 4
    //quaterly=3
    //by anually=2
    //yearly = 1

    let prd_ip_dtl = [
      {
        "inst_nmbr": "1",
        "prd_ip_typ_key": "1"
      },
      {
        "inst_nmbr": "2",
        "prd_ip_typ_key": "1"
      },
      {
        "inst_nmbr": "3",
        "prd_ip_typ_key": "1"
      },
      {
        "inst_nmbr": "4",
        "prd_ip_typ_key": "1"
      },
      {
        "inst_nmbr": "5",
        "prd_ip_typ_key": "1"
      },
      {
        "inst_nmbr": "1",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "2",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "3",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "3",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "4",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "5",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "6",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "7",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "8",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "9",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "10",
        "prd_ip_typ_key": "2"
      },
      {
        "inst_nmbr": "1",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "2",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "3",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "4",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "5",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "6",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "7",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "8",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "9",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "10",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "11",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "12",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "13",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "14",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "15",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "16",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "17",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "18",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "19",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "20",
        "prd_ip_typ_key": "3"
      },
      {
        "inst_nmbr": "1",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "2",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "3",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "4",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "5",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "6",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "7",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "8",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "9",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "10",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "11",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "12",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "13",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "14",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "15",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "16",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "17",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "18",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "19",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "20",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "21",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "22",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "23",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "24",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "25",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "26",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "27",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "28",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "29",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "30",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "31",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "32",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "33",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "34",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "35",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "36",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "37",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "38",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "39",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "40",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "41",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "42",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "43",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "44",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "45",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "46",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "47",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "48",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "49",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "50",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "51",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "52",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "53",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "54",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "55",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "56",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "57",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "58",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "59",
        "prd_ip_typ_key": "4"
      },
      {
        "inst_nmbr": "60",
        "prd_ip_typ_key": "4"
      }
    ]
    //distribution
    let prd_chrg_ip_dst = [{
      "prd_ip_typ_prcnt_vlu": "20",
      "prd_ip_typ_key": "1",
      "prd_ip_hdr_key": "1"
    },
    {
      "prd_ip_typ_prcnt_vlu": "20",
      "prd_ip_typ_key": "2",
      "prd_ip_hdr_key": "1"
    },
    {
      "prd_ip_typ_prcnt_vlu": "30",
      "prd_ip_typ_key": "3",
      "prd_ip_hdr_key": "1"
    },
    {
      "prd_ip_typ_prcnt_vlu": "50",
      "prd_ip_typ_key": "4",
      "prd_ip_hdr_key": "1"
    }
    ]

    let sgrYearly = prd_ip_dtl.filter(x => x.prd_ip_typ_key as any == 1)
    let sgrByAnually = prd_ip_dtl.filter(x => x.prd_ip_typ_key as any == 2)
    let sgrQuaterly = prd_ip_dtl.filter(x => x.prd_ip_typ_key as any == 3)
    let sgrMonthly = prd_ip_dtl.filter(x => x.prd_ip_typ_key as any == 4)
    let _sgrYearly = [] as any;
    let _sgrByAnually = [] as any;
    let _sgrQuaterly = [] as any;
    let _sgrMonthly = [] as any;

    for (let i = 0; i < (this.prd_ip_mnth); i++) {
      if (sgrMonthly[i] && sgrMonthly[i]?.prd_ip_typ_key) {
        _sgrMonthly.push({ prd_ip_typ_key: sgrMonthly[i].prd_ip_typ_key, inst_nmbr: i + 1, code: sgrMonthly[i].prd_ip_typ_key } as any);
      }
      else {
        _sgrMonthly.push({ prd_ip_typ_key: -4, inst_nmbr: i + 1, code: 4 } as any);
      }
    }
    for (let i = 0; i < (qauterInMonth); i++) {
      if (sgrQuaterly[i] && sgrQuaterly[i]?.prd_ip_typ_key) {
        _sgrQuaterly.push({ prd_ip_typ_key: sgrQuaterly[i].prd_ip_typ_key, inst_nmbr: i + 1, code: sgrQuaterly[i].prd_ip_typ_key } as any);
      }
      else {
        _sgrQuaterly.push({ prd_ip_typ_key: -3, inst_nmbr: i + 1, code: 3 } as any);
      }
    }
    for (let i = 0; i < (byAnualsInMonth); i++) {
      if (sgrByAnually[i] && sgrByAnually[i]?.prd_ip_typ_key) {
        _sgrByAnually.push({ prd_ip_typ_key: sgrByAnually[i].prd_ip_typ_key, inst_nmbr: i + 1, code: sgrByAnually[i].prd_ip_typ_key } as any);
      }
      else {
        _sgrByAnually.push({ prd_ip_typ_key: -2, inst_nmbr: i + 1, code: 2 } as any);
      }
    }
    for (let i = 0; i < (yearsInMonth); i++) {
      if (sgrYearly[i] && sgrYearly[i]?.prd_ip_typ_key) {
        _sgrYearly.push({ prd_ip_typ_key: sgrYearly[i].prd_ip_typ_key, inst_nmbr: i + 1, code: sgrYearly[i].prd_ip_typ_key } as any);
      }
      else {
        _sgrYearly.push({ prd_ip_typ_key: -1, inst_nmbr: i + 1, code: 1 } as any);
      }
    }

    prd_ip_dtl = [..._sgrYearly, ..._sgrByAnually, ..._sgrQuaterly, ..._sgrMonthly]
    this.presetSegrigation = prd_ip_dtl;
    this.presetDistribution = prd_chrg_ip_dst;

    for (let i = 0; i < this.discountsArray.length; i++) {
      this.discountsArray[i].dst = JSON.parse(JSON.stringify(prd_chrg_ip_dst));
      this.discountsArray[i].sgr = JSON.parse(JSON.stringify(prd_ip_dtl));

    }

    for (let i = 0; i < this.chargesArray.length; i++) {
      this.chargesArray[i].dst = JSON.parse(JSON.stringify(prd_chrg_ip_dst));
      this.chargesArray[i].sgr = JSON.parse(JSON.stringify(prd_ip_dtl));

    }


  }


  updateSegrigatoinValueViaDistribution(SgrArray: any[], installmentPlanKey: any, distributionValue: any) {
    if ((distributionValue <= 0) && installmentPlanKey) {
      SgrArray.map(x => {
        if (x.code == installmentPlanKey && x.prd_ip_typ_key > 0) {
          x.prd_ip_typ_key *= -1;
        }
        return x;
      })
    }
  }

  SegregationVaisibilityViaDistribution(DistributionArray: any[], installmentPlanKey: any) {
    let t = DistributionArray.find(x => x.prd_ip_typ_key == installmentPlanKey);
    if (t?.prd_ip_typ_key && t?.prd_ip_typ_prcnt_vlu > 0) {
      return true;
    }
    else return false;

  }

  fun(event: any) {
    //toggle
    if (event.prd_ip_typ_key >= 1) event.prd_ip_typ_key *= -1;
    else event.prd_ip_typ_key *= -1;
  }

  check(event: any) {
    if (event > 0) return true;
    else return false;
  }

  logChanges() {
    console.log(this.chargesArray[0].dst)
  }

  distributionSum100(dst: any[]) {

    let sum = 0;
    dst.forEach(x => {
      let value = Number(x.prd_ip_typ_prcnt_vlu)
      sum += value
    });
    if (sum == 100) {
      return true;
    }
    else {

      return false;
    }
  }

  addOrRemoveReacticeFormValueViaAnotherReactiveValue() {
    this.addCustomerFormGroup.get('paymentAddressSameAsPermanentAddress')?.valueChanges.subscribe(x => {
      if (x) {
        this.samePaymentAddress = !this.samePaymentAddress;
        let zxz = ['address', "cty_key", 'stt_key', 'cntry_key', 'hse_nmbr', 'strt_nm', 'oth_dtl']
        let payment_address = (this.addCustomerFormGroup.get('payment_address') as FormGroup)
        zxz.forEach(zx => {
          payment_address.removeControl(zx + "");
        });

      }
      else {
        let payment_address = (this.addCustomerFormGroup.get('payment_address') as FormGroup)
        
        payment_address.addControl('address', new FormControl("", [Validators.required]))
        payment_address.addControl('cty_key', new FormControl("", [Validators.required]))
        payment_address.addControl('stt_key', new FormControl("", [Validators.required]))
        payment_address.addControl('cntry_key', new FormControl("", [Validators.required]))
        payment_address.addControl('hse_nmbr', new FormControl("", [Validators.required]))
        payment_address.addControl('strt_nm', new FormControl("", [Validators.required]))
        payment_address.addControl('oth_dtl', new FormControl("", [Validators.required]))

        this.samePaymentAddress = x;
      }
    });

    this.addCustomerFormGroup.get('nomineeAddressSameAsPermanentAddress')?.valueChanges.subscribe(x => {
      if (x) {
        this.sameNomineeAddress = !this.sameNomineeAddress;
        let zxz = ['address', "cty_key", 'stt_key', 'cntry_key', 'hse_nmbr', 'strt_nm', 'oth_dtl']
        let nominee_address = (this.addCustomerFormGroup.get('nominee_address') as FormGroup)
        zxz.forEach(zx => {
          nominee_address.removeControl(zx + "");
        });

      }
      else {
        let nominee_address = (this.addCustomerFormGroup.get('nominee_address') as FormGroup)
        let zxz = ['address', "cty_key", 'stt_key', 'cntry_key', 'hse_nmbr', 'strt_nm', 'oth_dtl']
        zxz.forEach(zx => {
          nominee_address.addControl(zx+'', new FormControl("", [Validators.required]))
        });

        setTimeout(() => {
          this.sameNomineeAddress = x;
          
        }, 200);
      }
    });
    
  }

  //to helper

  onlyNumbers(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.charCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onlyLetters(event: any) {
    const pattern = /[a-zA-Z ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.charCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  alphaNumeric(event: any) {
    const pattern = /[0-9a-zA-Z/ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.charCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
