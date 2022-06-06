import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component {

    @ViewChild(MatTable,{static:true}) table: MatTable<any>;
   
    constructor(breakpointObserver: BreakpointObserver) {
        // breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        //     this.displayedColumns = result.matches ?
        //         ['plot_no', 'status', 'marla', 'symbol'] :
        //         ['plot_no', 'status', 'marla', 'symbol', 'features', 'action'];
        // });
        this.table = Object.create(null);
    }

    displayedColumns = ['plot_no', 'status', 'marla', 'payment_status', 'features', 'action'];
    dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

    openDialog(Action:string, row:any){
        console.log(Action, row);

        if (Action=="Delete") {
            let t = ELEMENT_DATA.findIndex(x=>x.plot_no==row.plot_no);
            if(t>-1){
                ELEMENT_DATA.slice(t,1)
                this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
                this.table.renderRows();
            }
        } else {
            
        }
        
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
