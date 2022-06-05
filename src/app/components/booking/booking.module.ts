import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BookingComponent } from './booking.component';
import { StarterRoutes } from './booking.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes),
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BookingComponent]
})
export class BookingModule {}
