import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UnitRegistrationComponent } from './unit-registration.component';
import { UnitRegistrationRoutes } from './unit-registration.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(UnitRegistrationRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UnitRegistrationComponent]
})
export class UnitRegistrationModule {}
