import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component {

    @ViewChild("plotTable") plotTable: MatTable<any>;
   
    constructor(breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
        // breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        //     this.displayedColumns = result.matches ?
        //         ['plot_no', 'status', 'marla', 'symbol'] :
        //         ['plot_no', 'status', 'marla', 'symbol', 'features', 'action'];
        // });
        this.plotTable = Object.create(null);
    }

    displayedColumns = ['plot_no', 'status', 'marla', 'payment_status', 'features', 'action'];
    dataSource =(ELEMENT_DATA);

    openDialog(Action:string, row:any){
        console.log(Action, row);

        if (Action=="Delete") {
            this.dataSource = this.dataSource.filter((value,key)=>{
                return value.plot_no != row.plot_no;
              });
        } else {
            
        }

        // const dialogRef = this.dialog.open(DialogBoxComponent, {
        //     width: '250px',
        //     data:row
        //   });
      
        //   dialogRef.afterClosed().subscribe(result => {
        //     if(result.event == 'Add'){
        //       this.addRowData(result.data);
        //     }else if(result.event == 'Update'){
        //       this.updateRowData(result.data);
        //     }else if(result.event == 'Delete'){
        //       this.deleteRowData(result.data);
        //     }
        //   });
        
    }
    
  addRowData(row_obj:Element){
    var d = new Date();
    // this.dataSource.push({
    //   id:d.getTime(),
    //   name:row_obj.name
    // });
    this.plotTable.renderRows();
    
  }
  updateRowData(row_obj:Element){
    this.dataSource = this.dataSource.filter((value:any,key:any)=>{
      if(value.plot_no == row_obj.plot_no){
        value.marla = row_obj.marla;
      }
      return true;
    });
  }
  deleteRowData(row_obj:Element){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.plot_no != row_obj.plot_no;
    });
  }
}

export interface Element {
    status: string|null;
    plot_no: number;
    marla: number;
    payment_status:string, 
    features:  string;
}

const ELEMENT_DATA: Element[] = [
    { plot_no: 1, status: 'Available', marla: 1, payment_status:"Late", features:  '60 ft. Corner' },
    { plot_no: 2, status: 'Booked', marla: 4, payment_status:"N/A", features:  '20 ft. Facing' },
    { plot_no: 3, status: 'Pending', marla: 6, payment_status:"On Time", features:  '60 ft. Corner' },
    { plot_no: 4, status: 'Cancelled', marla: 9, payment_status:"N/A", features:  '20 ft. Facing' },
    { plot_no: 5, status: 'Open', marla: 10, payment_status:"N/A", features:  '60 ft. Corner' },
    { plot_no: 6, status: 'Available', marla: 12, payment_status:"N/A", features:  '20 ft. Facing' },
    { plot_no: 7, status: 'Pending', marla: 14, payment_status:"N/A", features:  '60 ft. Corner' },
    { plot_no: 8, status: 'Open', marla: 16, payment_status:"N/A", features:  '20 ft. Facing' },
];
